<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? 'Error' }} - {{ config('app.name', 'Application') }}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #667eea;
            --primary-dark: #5568d3;
            --secondary: #764ba2;
            --error: #ef4444;
            --warning: #f59e0b;
            --success: #10b981;
            --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            --bg-gradient-animated: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe);
            --shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            --shadow-hover: 0 25px 80px rgba(0, 0, 0, 0.4);
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg-gradient);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            color: #1f2937;
            overflow-x: hidden;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }

        .error-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            box-shadow: var(--shadow);
            max-width: 800px;
            width: 100%;
            padding: 60px 48px;
            text-align: center;
            animation: slideIn 0.6s ease-out;
            position: relative;
            overflow: hidden;
        }

        .error-container::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
            animation: float 6s ease-in-out infinite;
        }

        .error-icon-wrapper {
            position: relative;
            margin: 0 auto 40px;
            width: 140px;
            height: 140px;
        }

        .error-icon {
            width: 140px;
            height: 140px;
            background: linear-gradient(135deg, #fee 0%, #fdd 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 64px;
            box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
            animation: pulse 2s ease-in-out infinite;
            position: relative;
            z-index: 1;
        }

        .error-icon::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ef4444, #f59e0b);
            opacity: 0.2;
            z-index: -1;
            animation: pulse 2s ease-in-out infinite;
        }

        .error-code {
            font-size: 120px;
            font-weight: 800;
            background: linear-gradient(135deg, #ef4444 0%, #f59e0b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            line-height: 1;
            letter-spacing: -4px;
            animation: shake 0.5s ease-in-out;
        }

        .error-title {
            font-size: 32px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 16px;
            letter-spacing: -0.5px;
        }

        .error-message {
            font-size: 18px;
            color: #6b7280;
            line-height: 1.7;
            margin-bottom: 40px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .error-description {
            background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
            border-radius: 16px;
            padding: 28px;
            margin-bottom: 32px;
            text-align: left;
            border: 1px solid rgba(229, 231, 235, 0.8);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .error-description h3 {
            font-size: 13px;
            font-weight: 700;
            color: #4b5563;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .error-description h3::before {
            content: '💡';
            font-size: 16px;
        }

        .error-description p {
            font-size: 16px;
            color: #6b7280;
            line-height: 1.8;
        }

        .error-details {
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 32px;
            text-align: left;
            display: none;
            border: 1px solid rgba(209, 213, 219, 0.8);
            animation: slideIn 0.3s ease-out;
        }

        .error-details.show {
            display: block;
        }

        .error-details h3 {
            font-size: 13px;
            font-weight: 700;
            color: #4b5563;
            margin-bottom: 16px;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .error-details h3::before {
            content: '🔍';
            font-size: 16px;
        }

        .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 12px 0;
            border-bottom: 1px solid rgba(209, 213, 219, 0.5);
            font-size: 14px;
            transition: background 0.2s;
        }

        .detail-item:hover {
            background: rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            padding-left: 8px;
            padding-right: 8px;
        }

        .detail-item:last-child {
            border-bottom: none;
        }

        .detail-label {
            font-weight: 600;
            color: #6b7280;
            min-width: 100px;
        }

        .detail-value {
            color: #1f2937;
            text-align: right;
            word-break: break-word;
            flex: 1;
            margin-left: 16px;
            font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
            font-size: 13px;
        }

        .toggle-details {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            border: none;
            color: white;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            padding: 12px 24px;
            border-radius: 12px;
            margin-bottom: 24px;
            transition: all 0.3s;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .toggle-details:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .toggle-details:active {
            transform: translateY(0);
        }

        .actions {
            display: flex;
            gap: 16px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 40px;
        }

        .btn {
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            border: none;
            font-size: 16px;
            position: relative;
            overflow: hidden;
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }

        .btn:hover::before {
            width: 300px;
            height: 300px;
        }

        .btn span {
            position: relative;
            z-index: 1;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
        }

        .btn-secondary {
            background: white;
            color: #4b5563;
            border: 2px solid #e5e7eb;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .btn-secondary:hover {
            background: #f9fafb;
            border-color: #d1d5db;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .decoration {
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            pointer-events: none;
        }

        .decoration-1 {
            top: -100px;
            right: -100px;
            animation: float 8s ease-in-out infinite;
        }

        .decoration-2 {
            bottom: -100px;
            left: -100px;
            animation: float 10s ease-in-out infinite reverse;
        }

        @media (max-width: 640px) {
            .error-container {
                padding: 40px 24px;
                border-radius: 20px;
            }

            .error-icon-wrapper {
                width: 120px;
                height: 120px;
            }

            .error-icon {
                width: 120px;
                height: 120px;
                font-size: 56px;
            }

            .error-code {
                font-size: 80px;
                letter-spacing: -2px;
            }

            .error-title {
                font-size: 24px;
            }

            .error-message {
                font-size: 16px;
            }

            .actions {
                flex-direction: column;
            }

            .btn {
                width: 100%;
                justify-content: center;
            }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .error-container {
                background: rgba(31, 41, 55, 0.95);
                color: #f9fafb;
            }

            .error-title {
                color: #f9fafb;
            }

            .error-message {
                color: #d1d5db;
            }

            .error-description {
                background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
                border-color: rgba(75, 85, 99, 0.8);
            }

            .error-description p {
                color: #d1d5db;
            }

            .error-details {
                background: linear-gradient(135deg, #4b5563 0%, #6b7280 100%);
                border-color: rgba(107, 114, 128, 0.8);
            }

            .detail-value {
                color: #f9fafb;
            }

            .btn-secondary {
                background: #374151;
                color: #f9fafb;
                border-color: #4b5563;
            }

            .btn-secondary:hover {
                background: #4b5563;
            }
        }
    </style>
</head>
<body>
    <div class="decoration decoration-1"></div>
    <div class="decoration decoration-2"></div>
    
    <div class="error-container">
        <div class="error-icon-wrapper">
            <div class="error-icon">
                @if(($code ?? 500) == 404)
                    🔍
                @elseif(($code ?? 500) == 403)
                    🔒
                @elseif(($code ?? 500) == 401)
                    🔐
                @elseif(($code ?? 500) >= 500)
                    ⚠️
                @else
                    ❌
                @endif
            </div>
        </div>
        
        <div class="error-code">{{ $code ?? 500 }}</div>
        <h1 class="error-title">{{ $title ?? 'An Error Occurred' }}</h1>
        <p class="error-message">{{ $message ?? 'An unexpected error occurred. Please try again later.' }}</p>

        @if(isset($description))
        <div class="error-description">
            <h3>What happened?</h3>
            <p>{{ $description }}</p>
        </div>
        @endif

        @if(isset($type) || isset($instance) || isset($exception_type))
        <button class="toggle-details" onclick="toggleDetails()">
            <span>Show Technical Details</span>
        </button>
        <div class="error-details" id="errorDetails">
            <h3>Technical Details</h3>
            @if(isset($type))
            <div class="detail-item">
                <span class="detail-label">Type:</span>
                <span class="detail-value">{{ $type }}</span>
            </div>
            @endif
            @if(isset($instance))
            <div class="detail-item">
                <span class="detail-label">Instance:</span>
                <span class="detail-value">{{ $instance }}</span>
            </div>
            @endif
            @if(isset($exception_type))
            <div class="detail-item">
                <span class="detail-label">Exception:</span>
                <span class="detail-value">{{ $exception_type }}</span>
            </div>
            @endif
        </div>
        @endif

        <div class="actions">
            <a href="javascript:history.back()" class="btn btn-secondary">
                <span>← Go Back</span>
            </a>
            <a href="{{ route('home') ?? url('/') }}" class="btn btn-primary">
                <span>🏠 Go Home</span>
            </a>
        </div>
    </div>

    <script>
        function toggleDetails() {
            const details = document.getElementById('errorDetails');
            const button = document.querySelector('.toggle-details');
            if (details) {
                details.classList.toggle('show');
                if (details.classList.contains('show')) {
                    button.innerHTML = '<span>Hide Technical Details</span>';
                } else {
                    button.innerHTML = '<span>Show Technical Details</span>';
                }
            }
        }

        // Add smooth scroll behavior
        document.querySelector('.toggle-details')?.addEventListener('click', function() {
            setTimeout(() => {
                const details = document.getElementById('errorDetails');
                if (details?.classList.contains('show')) {
                    details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 100);
        });
    </script>
</body>
</html>
