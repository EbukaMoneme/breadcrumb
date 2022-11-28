/**
 * fetches contents for the current path
 */
export async function getFilePath(mypath = "root") {
  const { data, error } = await (await fetch(`/api/path/${mypath}`)).json();

  if (data) {
    return { data, error };
  }

  return { data: [], error };
}
