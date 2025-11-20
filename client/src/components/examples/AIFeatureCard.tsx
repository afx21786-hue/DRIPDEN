import AIFeatureCard from '../AIFeatureCard'
import { Sparkles } from 'lucide-react'

export default function AIFeatureCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <AIFeatureCard
        icon={Sparkles}
        title="AI Outfit Combiner"
        description="Upload your favorite piece and let AI create 3 complete outfit combinations across different vibes"
        gradient="bg-gradient-to-br from-primary to-secondary"
        onClick={() => console.log('AI feature clicked')}
      />
    </div>
  )
}
