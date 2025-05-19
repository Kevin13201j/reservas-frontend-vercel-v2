import { reviews } from './data';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(reviews);
  }

  if (req.method === 'POST') {
    const nueva = { id: Date.now(), ...req.body };
    reviews.push(nueva);
    return res.status(201).json(nueva);
  }

  res.status(405).end();
}