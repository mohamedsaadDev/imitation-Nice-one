
export const changelanguge = (products,i18n) => {
    const proudctsmodification = products.map(product =>
        i18n.language ==="en"? product:
        {
        "_id": product._id,
        "title": product.title_ar,
        "type": product.type,
        "img1": product.img1,
        "img2": product.img2,
        "img3": product.img3,
        "price": product.price,
        "discount": product.discount,
        "oldprice": product.oldprice,
        "brindname": product.brindname_ar,
        "brandstatus":product.brandstatus_ar,
        "reviews": product.reviews,
        "reating": product.reating,
        "mostpopular": product.mostpopular_ar,
        "new": product.new_ar,
        "trending": product.trending_ar,
        "bestseller": product.bestseller_ar,
        "taxStatus": product.taxStatus_ar,
        "returnPolic": product.returnPolic_ar,
    })
    return proudctsmodification
}