import useDebugLogger from '@/hooks/use-debug-logger';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { log } = useDebugLogger()
  const goToDashboard = () => {
    router.visit(route('test.dashboard'), {
      method: 'get',
      only: ['message'],
      data: { mode: 'admin' },
      onStart: () => {
        log('loading...')
      },
      onSuccess: () => {
      },
      onFinish: (data) => {
        toast.success('Berhasil Horee!!')
        log(data)
      }
    });
  };

  return (
    <div className="p-6 flex flex-col gap-2">
      <h1 className="text-xl font-semibold mb-4">Halaman Home</h1>
      <button
        onClick={goToDashboard}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Visit ke Dashboard Test
      </button>

      <Link href="/test/dashboard" className="px-4 py-2 text-center items-center justify-center bg-blue-600 text-white rounded hover:bg-blue-700">
        Link ke Dashboard
      </Link>


      <div>
        <button onClick={() => router.visit('/test/dashboard', {
          only: ['stats'],
          preserveState: true,
          onStart: () => setLoading(true),
          onFinish: () => setLoading(false),
        })}>
          {loading ? 'Loading...' : 'Pergi ke Dashboard'}
        </button>
      </div>
    </div>

  );
}
