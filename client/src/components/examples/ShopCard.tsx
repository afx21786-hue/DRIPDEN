import ShopCard from '../ShopCard'
import bannerImg from '@assets/generated_images/streetwear_shop_banner_image.png'
import productImg1 from '@assets/generated_images/sneaker_product_image_1.png'
import productImg2 from '@assets/generated_images/jacket_product_image_2.png'
import productImg3 from '@assets/generated_images/hoodie_product_image_3.png'

export default function ShopCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <ShopCard
        id="1"
        name="Urban Threads"
        banner={bannerImg}
        logo="https://api.dicebear.com/7.x/shapes/svg?seed=urban"
        tags={["Streetwear", "Trending", "Local Favorite"]}
        location="Downtown"
        products={[
          { image: productImg1 },
          { image: productImg2 },
          { image: productImg3 }
        ]}
        isTrending={true}
        onClick={() => console.log('Shop clicked')}
      />
    </div>
  )
}
