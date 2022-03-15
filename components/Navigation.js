import Link from 'next/link';

const Navigation = ({ contentItems, commerceItems }) => {
    return <ul>
        {contentItems && contentItems.map(c => <li key={c.id}><Link href={`${c.path}`}>{c.title}</Link></li>)}
        {commerceItems && commerceItems.map(c => <li key={c.uid}><Link href={`/catalog/category/${c.url_path}`}>{c.name}</Link></li>)}
    </ul>;

}

export default Navigation;
