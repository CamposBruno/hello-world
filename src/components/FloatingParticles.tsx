interface ParticlePosition {
  left: string;
  top: string;
  delay: string;
  duration: string;
}

interface FloatingParticlesProps {
  positions: ParticlePosition[];
}

export function FloatingParticles({ positions }: FloatingParticlesProps) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {positions.map((particle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-bounce"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration
          }}
        />
      ))}
    </div>
  );
} 