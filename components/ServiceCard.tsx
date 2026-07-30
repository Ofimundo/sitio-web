import Image from "next/image"

export function ServiceCard({ image, title, description }: { image: string; title: string; description: string }) {
  return (
    <article className="rounded-xl bg-white p-1 text-center shadow-sm">
      <div className="relative mb-2 h-30 w-full overflow-hidden rounded-lg">
        <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
      </div>
      <div className="px-3 pb-4">
        <h3 className="mb-1 font-bold text-ofimundo-navy">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </article>
  )
}
