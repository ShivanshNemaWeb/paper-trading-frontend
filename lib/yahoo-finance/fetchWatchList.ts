import constants from '../../constants.json'
export async function fetchWatchList() {
  const baseUrl = constants.baseUrl
  const url = `${baseUrl}/watchlist/get`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
  } catch (error: any) {
    console.error("Failed to fetch watchlist:", error.message);
  }
}
