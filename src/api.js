

export async function fetchDivergence(taxonA, taxonB) {
  const res = await fetch(`/api/pairwise?taxonA=${taxonA}&taxonB=${taxonB}`);
  if (!res.ok) throw new Error('API failed');
  return res.json();
}
