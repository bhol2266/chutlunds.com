// pages/api/revalidate.js
export default async function handler(req, res) {
  // Check if secret token & query param are valid
  const { secret, category } = req.query;

  if (secret !== "sdfsdfsafsdafsdfsdfsdfsfcxbxzcfsdaf") {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!category) {
    return res.status(400).json({ message: 'Category query required' });
  }

  try {
    // Revalidate the category page
    await res.revalidate(`/category/${category}`);

    return res.json({ revalidated: true, category });
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating', err });
  }
}
