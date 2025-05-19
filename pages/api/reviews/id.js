import { reviews } from './data';

export default function handler(req, res) {
  const { id } = req.query;
  const numericId = parseInt(id);
  const review = reviews.find(r => r.id === numericId);

  if (!review) {
    return res.status(404).json({ error: 'Reseña no encontrada' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(review);
  }

  if (req.method === 'DELETE') {
    const index = reviews.findIndex(r => r.id === numericId);
    reviews.splice(index, 1);
    return res.status(204).end();
  }

  res.status(405).end();
}