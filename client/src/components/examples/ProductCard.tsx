import ProductCard from '../ProductCard'
import productImg from '@assets/generated_images/sneaker_product_image_1.png'

export default function ProductCardExample() {
  return (
    <div className="p-6 max-w-xs">
      <ProductCard
        id="1"
        name="Neon Runner Sneakers"
        price={129}
        image={productImg}
        shopName="Urban Threads"
        onClick={() => console.log('Product clicked')}
      />
    </div>
  )
}
