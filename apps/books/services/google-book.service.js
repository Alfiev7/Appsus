export const googleBookService = {
  query,
}

function query(params) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${params}`
  return axios.get(url).then(res =>
    res.data.items.map(item => ({
      title: item.volumeInfo.title,
      subtitle: '',
      authors: item.volumeInfo.authors || [],
      description: item.volumeInfo.description || '',
      pageCount: item.volumeInfo.pageCount || 0,
      categories: item.volumeInfo.categories || [],
      language: item.volumeInfo.language || '',
      listPrice:
        (item.saleInfo.listPrice && {
          amount: item.saleInfo.listPrice.amount || 0,
          currencyCode: item.saleInfo.listPrice.currencyCode || '',
          isOnSale: false,
        }) ||
        {},
      publishedDate: item.volumeInfo.publishedDate,
      thumbnail:
        (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) ||
        {},
    }))
  )
}
