// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

  console.log('req.body');
  console.log(req.body);

  res.status(200).json({ name: 'John Doe' })
}
