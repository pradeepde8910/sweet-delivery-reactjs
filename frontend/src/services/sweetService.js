import axios from 'axios';
import {sample_sweets} from '../data';




export const getAll = async () => {
  try {
    const { data } = await axios.get('/api/sweets');
    return data;
  } catch (error) {
    console.error('Error fetching sweets:', error);
    throw error; // Rethrow the error to handle it where the function is called
  }
};


export const search = async searchTerm => {
  const { data } = await axios.get('/api/sweets/search/' + searchTerm);
  return data;
};

export const getAllTags = async () => {
  const { data } = await axios.get('/api/sweets/tags');
  return data;
};

export const getAllByTag = async tag => {
  if (tag === 'All') return getAll();
  const { data } = await axios.get('/api/sweets/tag/' + tag);
  return data;
};

export const getById = async sweetId => {
  const { data } = await axios.get('/api/sweets/' + sweetId);
  return data;
};

export async function deleteById(sweetId) {
  await axios.delete('/api/sweets/' + sweetId);
}
