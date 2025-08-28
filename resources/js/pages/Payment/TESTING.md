# Payment System Testing Guide

## 🧪 Testing Routes

### Base URL Structure

```
/{nouid}/payment/{route}
```

### Available Test Routes

#### 1. Payment Index

```
GET /{nouid}/payment
```

**Example:** `http://localhost:8000/12345/payment`

**Features to test:**

- Ringkasan saldo dan tagihan
- Aksi pembayaran (Lihat Invoice, Metode Pembayaran, Riwayat)
- Informasi cepat siswa
- Bantuan pembayaran

#### 2. Invoice Page

```
GET /{nouid}/payment/invoice
GET /{nouid}/payment/invoice/{invoiceId}
```

**Example:**

- `http://localhost:8000/12345/payment/invoice`
- `http://localhost:8000/12345/payment/invoice/INV-2024-001`

**Features to test:**

- Invoice display dengan format resmi
- Print area (Ctrl+P atau tombol print)
- Download invoice
- View invoice detail
- Status pembayaran
- Payment information

#### 3. Payment History

```
GET /{nouid}/payment/history
```

**Example:** `http://localhost:8000/12345/payment/history`

**Features to test:**

- Ringkasan statistik transaksi
- Daftar transaksi dengan filter
- Modal detail transaksi
- Download receipt
- Status badges

#### 4. Payment Methods

```
GET /{nouid}/payment/methods
```

**Example:** `http://localhost:8000/12345/payment/methods`

**Features to test:**

- Ringkasan pembayaran
- Pilihan metode pembayaran
- Validasi saldo
- Error handling
- Security information

#### 5. Payment Success

```
GET /{nouid}/payment/success
```

**Example:** `http://localhost:8000/12345/payment/success`

**Features to test:**

- Success message
- Transaction details
- Next steps
- Action buttons

#### 6. VA Payment

```
GET /{nouid}/payment/va-payment
```

**Example:** `http://localhost:8000/12345/payment/va-payment`

**Features to test:**

- Virtual account display
- Copy VA number functionality
- Payment instructions
- Important notes
- Status checking

## 🔧 API Endpoints

### Download Invoice

```
POST /{nouid}/payment/invoice/{invoiceId}/download
```

### Print Invoice

```
POST /{nouid}/payment/invoice/{invoiceId}/print
```

### View Invoice

```
POST /{nouid}/payment/invoice/{invoiceId}/view
```

### Process Payment

```
POST /{nouid}/payment/process
```

## 📊 Dummy Data

### Student Data

```json
{
    "auth": {
        "user": {
            "id": 1,
            "nouid": "12345",
            "namlen": "Ahmad Fadillah",
            "email": "ahmad@example.com",
            "phone": "081234567890"
        }
    },
    "data": {
        "idok": 1,
        "active": true,
        "nouid": "12345",
        "balance": 2500000,
        "siswa": {
            "id": 1,
            "nouid": "12345",
            "namlen": "Ahmad Fadillah",
            "email": "ahmad@example.com",
            "phone": "081234567890",
            "kelas": "XI IPA 1",
            "alamat": "Jl. Sudirman No. 123, Jakarta"
        },
        "tagihan": [
            {
                "id": 1,
                "tah": "2024",
                "jen": 0,
                "ket": "SPP Januari 2024",
                "jumlah": 500000,
                "bulan": "Januari",
                "sta": 0
            },
            {
                "id": 2,
                "tah": "2024",
                "jen": 0,
                "ket": "SPP Februari 2024",
                "jumlah": 500000,
                "bulan": "Februari",
                "sta": 0
            },
            {
                "id": 3,
                "tah": "2024",
                "jen": 1,
                "ket": "Uang Makan Maret 2024",
                "jumlah": 750000,
                "bulan": "Maret",
                "sta": 0
            },
            {
                "id": 4,
                "tah": "2024",
                "jen": 2,
                "ket": "Uang Kegiatan April 2024",
                "jumlah": 300000,
                "bulan": "April",
                "sta": 0
            }
        ],
        "summary": {
            "total_tagihan": 2050000,
            "total_dibayar": 0,
            "total_belum_dibayar": 2050000,
            "exist_trx": {
                "exist": false,
                "uri": null
            },
            "future_bills": true
        }
    }
}
```

## 🎯 Testing Scenarios

### 1. Invoice Testing

- [ ] Invoice displays correctly with all data
- [ ] Print functionality works (Ctrl+P)
- [ ] Print area shows only invoice content (no buttons/actions)
- [ ] Download functionality works
- [ ] View functionality works
- [ ] Status badges display correctly
- [ ] Payment information shows when available

### 2. Payment Flow Testing

- [ ] Navigate from index to methods
- [ ] Select payment method
- [ ] Process payment (success/failure scenarios)
- [ ] Navigate to success page
- [ ] Navigate to VA payment page
- [ ] Copy VA numbers
- [ ] Check payment status

### 3. Responsive Testing

- [ ] Mobile view (320px - 768px)
- [ ] Tablet view (768px - 1024px)
- [ ] Desktop view (1024px+)
- [ ] Print view (Ctrl+P)

### 4. Error Handling Testing

- [ ] Network errors
- [ ] Validation errors
- [ ] Processing errors
- [ ] User feedback

### 5. Accessibility Testing

- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] High contrast support
- [ ] ARIA labels

## 🐛 Known Issues

### Current Limitations

1. **Print Styles**: May need browser-specific adjustments
2. **PDF Generation**: Currently simulated, needs real implementation
3. **Real-time Updates**: Payment status updates are simulated
4. **Bank Integration**: VA numbers are dummy data

### Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ⚠️ Edge (may need testing)
- ⚠️ Mobile browsers (may need testing)

## 🚀 Performance Testing

### Load Testing

- [ ] Page load times < 2 seconds
- [ ] Component render times < 500ms
- [ ] API response times < 1 second

### Memory Testing

- [ ] No memory leaks on navigation
- [ ] Proper cleanup of event listeners
- [ ] Efficient re-renders

## 📱 Mobile Testing

### Touch Interactions

- [ ] Button tap targets (minimum 44px)
- [ ] Swipe gestures
- [ ] Pinch to zoom
- [ ] Orientation changes

### Performance

- [ ] Smooth scrolling
- [ ] Fast tap response
- [ ] Efficient memory usage

## 🔒 Security Testing

### Input Validation

- [ ] XSS prevention
- [ ] SQL injection prevention
- [ ] CSRF protection
- [ ] Input sanitization

### Data Protection

- [ ] Sensitive data not logged
- [ ] Secure transmission (HTTPS)
- [ ] Proper session management

## 📋 Test Checklist

### Functional Testing

- [ ] All routes accessible
- [ ] Navigation works correctly
- [ ] Forms submit properly
- [ ] Error messages display
- [ ] Success messages display
- [ ] Loading states work
- [ ] Data displays correctly

### UI/UX Testing

- [ ] Design matches mockups
- [ ] Colors and typography correct
- [ ] Spacing and alignment proper
- [ ] Icons display correctly
- [ ] Animations smooth
- [ ] Responsive design works

### Integration Testing

- [ ] API calls work
- [ ] Data flows correctly
- [ ] State management works
- [ ] Error handling functions
- [ ] Logging works

### End-to-End Testing

- [ ] Complete payment flow
- [ ] User journey from start to finish
- [ ] All edge cases handled
- [ ] Error recovery works

## 🛠️ Debug Tools

### Browser DevTools

- Network tab for API calls
- Console for errors
- Elements tab for CSS issues
- Application tab for storage

### React DevTools

- Component tree inspection
- Props and state debugging
- Performance profiling

### Laravel Debug

- Log files for backend errors
- Database queries
- Cache issues

## 📞 Support

For testing issues or questions:

1. Check browser console for errors
2. Verify network connectivity
3. Clear browser cache
4. Check Laravel logs
5. Contact development team
