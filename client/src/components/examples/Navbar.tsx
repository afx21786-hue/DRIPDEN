import Navbar from '../Navbar'

export default function NavbarExample() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="p-6 text-center text-muted-foreground">
        Click the DRIPDEN icon to see notifications
      </div>
    </div>
  )
}
