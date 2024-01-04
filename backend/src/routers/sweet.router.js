import { Router } from 'express';
import { SweetModel } from '../models/sweet.model.js';
import handler from 'express-async-handler';
import admin from '../middleware/admin.mid.js';

const router = Router();

router.get(
  '/',
  handler(async (req, res) => {
    const sweets = await SweetModel.find({});
    res.send(sweets);
  })
);

router.delete(
  '/:sweetId',
  admin,
  handler(async (req, res) => {
    const { sweetId } = req.params;
    await SweetModel.deleteOne({ _id: sweetId });
    res.send();
  })
);

router.get(
  '/tags',
  handler(async (req, res) => {
    const tags = await SweetModel.aggregate([
      {
        $unwind: '$tags',
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: '$count',
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: 'All',
      count: await SweetModel.countDocuments(),
    };

    tags.unshift(all);

    res.send(tags);
  })
);

router.get(
  '/search/:searchTerm',
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');

    const sweets = await SweetModel.find({ name: { $regex: searchRegex } });
    res.send(sweets);
  })
);

router.get(
  '/tag/:tag',
  handler(async (req, res) => {
    const { tag } = req.params;
    const sweets = await SweetModel.find({ tags: tag });
    res.send(sweets);
  })
);

router.get(
  '/:sweetId',
  handler(async (req, res) => {
    const { sweetId } = req.params;
    const sweet = await SweetModel.findById(sweetId);
    res.send(sweet);
  })
);

export default router;
