import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold">Página não encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <Link href="/">
        <span className="text-blue-600">
          Clique aqui, para voltar para a página inicial
        </span>
      </Link>
    </div>
  );
}
