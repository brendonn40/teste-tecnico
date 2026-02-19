import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center max-w-md w-full space-y-6">
        <AlertCircle className="mx-auto h-12 w-12 text-yellow-500" />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Acesso Não Autorizado
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
          Desculpe, você não tem permissão para acessar esta página.
        </p>
        <Button
          className="w-full sm:w-auto px-8 py-2"
          onClick={() => navigate('/')}
        >
          Voltar para a Página Inicial
        </Button>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
