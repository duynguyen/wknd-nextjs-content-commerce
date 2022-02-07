import Link from 'next/link'

export default function ListItem({ path, title, description, imageSrc }) {
  return (
    <div>
      <Link href={path}><a>
        <h2>{title}</h2>
      </a></Link>
      <img height="300px" alt={title} src={imageSrc}/>
      <p>{description}</p>
    </div>
  )
}