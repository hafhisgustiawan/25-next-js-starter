// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method !== 'GET') throw new Error('Cant find this routing');
  res.status(200).json({ name: 'John Doe' });
}
