<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Error - SNAP Payment</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .error-container {
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 600px;
            width: 100%;
            padding: 40px;
            text-align: center;
        }

        .error-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 24px;
            background: #fee;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
        }

        .error-code {
            font-size: 48px;
            font-weight: bold;
            color: #e53e3e;
            margin-bottom: 16px;
        }

        .error-title {
            font-size: 24px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 12px;
        }

        .error-message {
            font-size: 16px;
            color: #718096;
            line-height: 1.6;
            margin-bottom: 24px;
        }

        .error-details {
            background: #f7fafc;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
            text-align: left;
        }

        .error-details h3 {
            font-size: 14px;
            font-weight: 600;
            color: #4a5568;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .detail-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
        }

        .detail-item:last-child {
            border-bottom: none;
        }

        .detail-label {
            font-weight: 600;
            color: #718096;
            font-size: 14px;
        }

        .detail-value {
            color: #2d3748;
            font-size: 14px;
            text-align: right;
        }

        .actions {
            display: flex;
            gap: 12px;
            justify-content: center;
        }

        .btn {
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            transition: all 0.2s;
            cursor: pointer;
            border: none;
            font-size: 14px;
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-primary:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
            background: #e2e8f0;
            color: #4a5568;
        }

        .btn-secondary:hover {
            background: #cbd5e0;
        }

        .category-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }

        .category-business {
            background: #fed7d7;
            color: #c53030;
        }

        .category-system {
            background: #feebc8;
            color: #c05621;
        }

        .category-message {
            background: #bee3f8;
            color: #2c5282;
        }

        @media (max-width: 640px) {
            .error-container {
                padding: 24px;
            }

            .error-code {
                font-size: 36px;
            }

            .error-title {
                font-size: 20px;
            }

            .actions {
                flex-direction: column;
            }

            .btn {
                width: 100%;
            }
        }
    </style>
</head>

<body>
    <div class="error-container">
        <div class="error-icon">⚠️</div>
        <div class="error-code">{{ $errorCode ?? 'ERROR' }}</div>
        <h1 class="error-title">Terjadi Kesalahan</h1>
        <p class="error-message">{{ $errorMessage ?? 'Terjadi kesalahan saat memproses transaksi SNAP.' }}</p>

        @if(isset($errorDetails))
            <div class="error-details">
                <h3>Detail Error</h3>
                @if(isset($errorDetails['category']))
                    <div class="detail-item">
                        <span class="detail-label">Kategori:</span>
                        <span class="detail-value">
                            <span class="category-badge category-{{ strtolower($errorDetails['category']) }}">
                                {{ $errorDetails['category'] }}
                            </span>
                        </span>
                    </div>
                @endif
                @if(isset($errorDetails['http_code']))
                    <div class="detail-item">
                        <span class="detail-label">HTTP Code:</span>
                        <span class="detail-value">{{ $errorDetails['http_code'] }}</span>
                    </div>
                @endif
                @if(isset($errorDetails['description']))
                    <div class="detail-item">
                        <span class="detail-label">Deskripsi:</span>
                        <span class="detail-value">{{ $errorDetails['description'] }}</span>
                    </div>
                @endif
                @if(isset($errorDetails['description_internal']))
                    <div class="detail-item">
                        <span class="detail-label">Deskripsi Internal:</span>
                        <span class="detail-value">{{ $errorDetails['description_internal'] }}</span>
                    </div>
                @endif
            </div>
        @endif

        <div class="actions">
            <a href="{{ url()->previous() ?? route('home') }}" class="btn btn-secondary">Kembali</a>
            <a href="{{ route('home') }}" class="btn btn-primary">Ke Beranda</a>
        </div>
    </div>
</body>

</html>