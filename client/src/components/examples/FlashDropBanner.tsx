import FlashDropBanner from '../FlashDropBanner'

export default function FlashDropBannerExample() {
  return (
    <div className="p-6">
      <FlashDropBanner onClick={() => console.log('Flash drop clicked')} />
    </div>
  )
}
