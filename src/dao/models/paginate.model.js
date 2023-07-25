






  router.get("/", async (req, res) => {
    try {
      let page = parseInt(req.query.page) || 1
      let limit = parseInt(req.query.limit) || 2
      

      const result = await productsModel.paginate({}, { page, limit, lean: true})
      console.log(result)
      result.prevLink = result.hasPrevPage ? `/mongoose?page=${result.prevPage}`
                                               : ''
      result.nextLink = result.hasNextPage ? `/mongoose?page=${result.nextPage}`
                                              : ''
      //  const products = await result.find().lean().exec()

      res.render('home', {
        
        products: result,
        prevLink: result.prevLink,
        nextLink: result.nextLink,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
        nextPage: result.nextPage,
        prevPage: result.prevPage
      }
        )

    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error: error.message });
    }
  })


