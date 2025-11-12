import express from 'express';
import Book from '../Model/BookSchema.js';
import FictionBook from '../Model/FictionBookSchema.js';
import ScienceBook from '../Model/ScienceBookSchema.js';
import BiographyBook from '../Model/BiographyBookSchema.js';
import FantasyBook from '../Model/FantasyBookSchema.js';
import HistoryBook from '../Model/HistoryBookSchema.js';
import TechnologyBook from '../Model/TechnologyBookSchema.js';
import RomanceBook from '../Model/RomanceBookSchema.js';
import EBook from '../Model/EBookSchema.js';
import Audiobook from '../Model/AudiobookSchema.js';

const router = express.Router();

// Helper function to create CRUD routes for a model
const createCRUDRoutes = (Model, routeName) => {
  // GET all
  router.get(`/${routeName}`, async (req, res) => {
    try {
      const items = await Model.find();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: `Error fetching ${routeName}`, error: error.message });
    }
  });

  // GET by ID
  router.get(`/${routeName}/:id`, async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: `${routeName} not found` });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: `Error fetching ${routeName}`, error: error.message });
    }
  });

  // POST create new
  router.post(`/${routeName}`, async (req, res) => {
    try {
      const newItem = new Model(req.body);
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ message: 'Duplicate ISBN. This book already exists.', error: error.message });
      } else {
        res.status(400).json({ message: `Error creating ${routeName}`, error: error.message });
      }
    }
  });

  // PUT update by ID
  router.put(`/${routeName}/:id`, async (req, res) => {
    try {
      const updatedItem = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ message: `${routeName} not found` });
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: `Error updating ${routeName}`, error: error.message });
    }
  });

  // PATCH partial update by ID
  router.patch(`/${routeName}/:id`, async (req, res) => {
    try {
      const updatedItem = await Model.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ message: `${routeName} not found` });
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: `Error updating ${routeName}`, error: error.message });
    }
  });

  // DELETE by ID
  router.delete(`/${routeName}/:id`, async (req, res) => {
    try {
      const deletedItem = await Model.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ message: `${routeName} not found` });
      }
      res.status(200).json({ message: `${routeName} deleted successfully`, item: deletedItem });
    } catch (error) {
      res.status(500).json({ message: `Error deleting ${routeName}`, error: error.message });
    }
  });

  // DELETE all (use with caution)
  router.delete(`/${routeName}`, async (req, res) => {
    try {
      const result = await Model.deleteMany({});
      res.status(200).json({ message: `All ${routeName} deleted`, count: result.deletedCount });
    } catch (error) {
      res.status(500).json({ message: `Error deleting all ${routeName}`, error: error.message });
    }
  });
};

// Create CRUD routes for all collections
createCRUDRoutes(Book, 'books');
createCRUDRoutes(EBook, 'ebooks');
createCRUDRoutes(Audiobook, 'audiobooks');
createCRUDRoutes(FictionBook, 'fiction');
createCRUDRoutes(ScienceBook, 'science');
createCRUDRoutes(BiographyBook, 'biography');
createCRUDRoutes(FantasyBook, 'fantasy');
createCRUDRoutes(HistoryBook, 'history');
createCRUDRoutes(TechnologyBook, 'technology');
createCRUDRoutes(RomanceBook, 'romance');

export default router;
