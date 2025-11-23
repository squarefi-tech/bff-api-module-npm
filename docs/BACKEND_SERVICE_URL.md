# Backend Public URL Usage

Guide for superadmin backend access to user files using permanent public URLs with service role key.

## Overview

For backend applications that need permanent access to files (e.g., admin dashboards, automated processing), use **Public URLs** from `getPublicUrl()` with Supabase service role key.

## Quick Example

```typescript
import { getPublicUrl, DEFAULT_BUCKET } from 'squarefi-bff-api-module';

// 1. Get permanent URL (can be done on frontend or backend)
const filePath = 'user-123/document.pdf';
const publicUrl = getPublicUrl(filePath, DEFAULT_BUCKET);

console.log(publicUrl);
// Output: https://xxx.supabase.co/storage/v1/object/public/user-files/user-123/document.pdf

// 2. Access file on backend with service role key
const response = await fetch(publicUrl, {
  headers: {
    'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
  }
});

if (response.ok) {
  const fileBlob = await response.blob();
  // Process file...
}
```

## Key Differences

### Signed URL vs Public URL

```typescript
// Signed URL - expires after 1 hour, no auth required
const signedUrl = await getSignedUrl({ 
  path: 'user-123/file.pdf',
  expiresIn: 3600 
});
// Use case: temporary link for end user

// Public URL - permanent, requires service role key
const publicUrl = getPublicUrl('user-123/file.pdf');
// Use case: backend processing, admin access
// Must use: fetch(publicUrl, { headers: { Authorization: Bearer SERVICE_KEY } })
```

## Security Requirements

### ⚠️ Critical: Service Role Key

- **NEVER expose** `SUPABASE_SERVICE_ROLE_KEY` on frontend
- Store in secure environment variables
- Use only on backend/server
- This key **bypasses all RLS policies**

### Environment Setup

```bash
# Copy env.example to .env and fill in your values
# See env.example in repository root for all available variables

# Backend only - NEVER commit to git
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Usage Examples

### Node.js/Express Backend

```javascript
import express from 'express';
import { getPublicUrl, DEFAULT_BUCKET } from 'squarefi-bff-api-module';

const app = express();

// Admin endpoint to access any user file
app.get('/admin/files/:userId/:fileName', async (req, res) => {
  const { userId, fileName } = req.params;
  const filePath = `${userId}/${fileName}`;
  
  // Get permanent URL
  const publicUrl = getPublicUrl(filePath, DEFAULT_BUCKET);
  
  // Fetch with service key
  const response = await fetch(publicUrl, {
    headers: {
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
    }
  });
  
  if (!response.ok) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  // Stream file to client
  const buffer = await response.arrayBuffer();
  res.setHeader('Content-Type', response.headers.get('content-type'));
  res.send(Buffer.from(buffer));
});
```

### Next.js API Route

```typescript
// pages/api/admin/file/[userId]/[fileName].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getPublicUrl, DEFAULT_BUCKET } from 'squarefi-bff-api-module';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, fileName } = req.query;
  const filePath = `${userId}/${fileName}`;
  
  const publicUrl = getPublicUrl(filePath, DEFAULT_BUCKET);
  
  const response = await fetch(publicUrl, {
    headers: {
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
    }
  });
  
  if (!response.ok) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  const buffer = await response.arrayBuffer();
  res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
  res.send(Buffer.from(buffer));
}
```

### Background Job/Worker

```typescript
import { getPublicUrl, DOCUMENTS_BUCKET } from 'squarefi-bff-api-module';

async function processUserDocument(userId: string, fileName: string) {
  const filePath = `${userId}/${fileName}`;
  const publicUrl = getPublicUrl(filePath, DOCUMENTS_BUCKET);
  
  // Download file
  const response = await fetch(publicUrl, {
    headers: {
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.statusText}`);
  }
  
  const fileContent = await response.text();
  
  // Process file...
  console.log('Processing document for user:', userId);
  
  // Your processing logic here
}

// Run in worker/cron job
await processUserDocument('user-123', 'invoice.pdf');
```

### Admin Dashboard

```typescript
// Frontend gets the URL, backend fetches the file
import { getPublicUrl, DEFAULT_BUCKET } from 'squarefi-bff-api-module';

// Frontend component
function AdminFileViewer({ userId, fileName }) {
  const [fileUrl, setFileUrl] = useState(null);
  
  useEffect(() => {
    // Get the URL (can be done on frontend)
    const publicUrl = getPublicUrl(`${userId}/${fileName}`, DEFAULT_BUCKET);
    
    // Call your backend to proxy the request
    fetch('/api/admin/proxy-file', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicUrl })
    })
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      setFileUrl(url);
    });
  }, [userId, fileName]);
  
  return fileUrl ? <img src={fileUrl} alt="File" /> : <p>Loading...</p>;
}

// Backend proxy endpoint (keeps service key secure)
app.post('/api/admin/proxy-file', async (req, res) => {
  const { publicUrl } = req.body;
  
  const response = await fetch(publicUrl, {
    headers: {
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
    }
  });
  
  const buffer = await response.arrayBuffer();
  res.setHeader('Content-Type', response.headers.get('content-type'));
  res.send(Buffer.from(buffer));
});
```

## Best Practices

### ✅ DO

- Store service role key in secure environment variables
- Access public URLs with service key only on backend
- Validate user permissions before accessing files
- Log all admin file access for audit trail
- Use proper error handling

### ❌ DON'T

- Never expose service role key on frontend
- Don't commit service key to version control
- Don't use service key on client-side (URL itself is fine, but don't add auth header)
- Don't skip audit logging
- Don't share service key across environments (use different keys for dev/prod)

## Error Handling

```typescript
async function downloadFileWithServiceKey(publicUrl: string) {
  try {
    const response = await fetch(publicUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('File not found');
      }
      if (response.status === 401) {
        throw new Error('Invalid service key');
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.blob();
  } catch (error) {
    console.error('Failed to download file:', error);
    throw error;
  }
}
```

## Audit Logging Example

```typescript
import { getPublicUrl } from 'squarefi-bff-api-module';

async function auditedFileAccess(
  adminUserId: string,
  targetUserId: string,
  fileName: string
) {
  // Log access
  await logAudit({
    action: 'FILE_ACCESS',
    adminId: adminUserId,
    targetUserId,
    fileName,
    timestamp: new Date(),
    ip: req.ip
  });
  
  // Get and access file
  const publicUrl = getPublicUrl(`${targetUserId}/${fileName}`);
  
  const response = await fetch(publicUrl, {
    headers: {
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
    }
  });
  
  return response;
}
```

## Troubleshooting

### File Not Found (404)

```typescript
// Check if file path is correct
const correctPath = `${userId}/${fileName}`;  // ✅
const wrongPath = `${fileName}`;              // ❌
```

### Unauthorized (401)

- Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Check if key is valid in Supabase Dashboard → Settings → API

### CORS Issues

If accessing from browser (not recommended but possible):

```typescript
// In Supabase Dashboard → Storage → Policies
// Make sure CORS is configured if needed
```

## Summary

| Aspect | Details |
|--------|---------|
| **Function** | `getPublicUrl(path, bucket)` |
| **Returns** | Permanent URL string |
| **Authentication** | Required: `Authorization: Bearer SERVICE_ROLE_KEY` (for private buckets) |
| **Expiration** | Never expires |
| **Use Case** | Backend/admin access to private buckets |
| **Security** | ⚠️ NEVER expose service key on frontend |

## Related Documentation

- [Full Storage Module Docs](./STORAGE_MODULE.md)
- [Frontend Guide](./FRONTEND_STORAGE_GUIDE.md)
- [Quick Start](./STORAGE_QUICK_START.md)

