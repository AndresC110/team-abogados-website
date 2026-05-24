# Team Abogados Website - Deployment Guide

This guide covers how to deploy the Team Abogados marketing website to Vercel with Supabase database integration and EmailJS notifications.

## Prerequisites

- GitHub account (free)
- Vercel account (free tier sufficient)
- Supabase account (free tier sufficient)
- EmailJS account (free tier sufficient)
- Domain `teamabogados.com` (already owned)

## Step 1: Initialize Git & Push to GitHub

```bash
cd website
git init
git add .
git commit -m "Initial commit: Team Abogados marketing website with Supabase and EmailJS integration"
```

Create a new GitHub repository at https://github.com/new named `team-abogados-website` (or similar).

```bash
git remote add origin https://github.com/YOUR_USERNAME/team-abogados-website.git
git branch -M main
git push -u origin main
```

## Step 2: Set Up Supabase

1. **Create a new Supabase project**:
   - Go to https://app.supabase.com
   - Click "New Project"
   - Name: `Team Abogados`
   - Region: Choose closest to US East (for NY/NJ service area)

2. **Create the contact submissions table**:
   - In the Supabase dashboard, go to SQL Editor
   - Run this SQL:
   ```sql
   CREATE TABLE contact_submissions (
     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     name VARCHAR(255) NOT NULL,
     phone VARCHAR(20) NOT NULL,
     accident_type VARCHAR(255) NOT NULL,
     contact_time VARCHAR(50),
     message TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Enable Row Level Security (RLS)
   ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

   -- Create a policy to allow anonymous inserts
   CREATE POLICY "Allow anonymous inserts" ON contact_submissions
     FOR INSERT WITH CHECK (TRUE);
   ```

3. **Get your credentials**:
   - Go to Settings → API
   - Copy `Project URL` (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - Copy `anon public` key (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - Go to Settings → Database
   - Copy the connection string and get the service key (this is your `SUPABASE_SERVICE_KEY`)

## Step 3: Set Up EmailJS

1. **Create an EmailJS account**:
   - Go to https://www.emailjs.com
   - Sign up (free tier)

2. **Add Email Service**:
   - Go to Email Services
   - Add "Gmail" or your preferred email service
   - Follow the setup instructions

3. **Create Email Template**:
   - Go to Email Templates
   - Create a new template with these variables:
     - `{{to_email}}` - recipient email
     - `{{client_name}}` - client name
     - `{{client_phone}}` - client phone
     - `{{accident_type}}` - type of accident
     - `{{contact_time}}` - preferred contact time
     - `{{message}}` - client message
     - `{{timestamp}}` - submission time

   Example template:
   ```
   Subject: Nueva solicitud de consulta - {{client_name}}

   Nombre: {{client_name}}
   Teléfono: {{client_phone}}
   Tipo de accidente: {{accident_type}}
   Contactar: {{contact_time}}
   Timestamp: {{timestamp}}

   Mensaje:
   {{message}}
   ```

4. **Get your credentials**:
   - Go to Account → API Keys
   - Copy `Public Key` (this is your `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`)
   - Copy `Private Key` (this is your `EMAILJS_PRIVATE_KEY`)
   - Note your `Service ID` and `Template ID` from the Email Services section

## Step 4: Deploy to Vercel

1. **Connect GitHub to Vercel**:
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository `team-abogados-website`
   - Click "Import"

2. **Configure Environment Variables**:
   - In Vercel's deployment settings, add these variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
     NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
     SUPABASE_SERVICE_KEY=<your-service-key>
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=<your-public-key>
     EMAILJS_PRIVATE_KEY=<your-private-key>
     EMAILJS_SERVICE_ID=<your-service-id>
     EMAILJS_TEMPLATE_ID=<your-template-id>
     NEXT_PUBLIC_ADMIN_EMAIL=contact@teamabogados.com
     ```

3. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete (usually 1-2 minutes)
   - You'll get a Vercel URL like `https://team-abogados-website.vercel.app`

## Step 5: Point Domain to Vercel

1. **Add Custom Domain in Vercel**:
   - In Vercel project settings, go to "Domains"
   - Add `teamabogados.com`
   - Vercel will show you the DNS records to add

2. **Update Your Domain DNS**:
   - Log into your domain registrar (GoDaddy, Namecheap, etc.)
   - Go to DNS settings
   - Add the CNAME record that Vercel provides:
     ```
     Host: www
     Type: CNAME
     Value: cname.vercel-dns.com
     ```
   - Add an A record:
     ```
     Host: @
     Type: A
     Value: 76.76.19.131
     ```

3. **Wait for DNS Propagation**:
   - DNS changes can take 24 hours to fully propagate
   - You can check status at https://www.whatsmydns.net/

## Testing

Once deployed:

1. **Test the website**:
   - Visit `https://teamabogados.com`
   - Verify all pages load
   - Test navigation links
   - Test responsive design on mobile

2. **Test the contact form**:
   - Open the website
   - Click "Consulta gratis" button
   - Fill out the form
   - Submit
   - Verify:
     - Success message appears
     - Data appears in Supabase `contact_submissions` table
     - Email received at your admin email address

3. **Monitor errors**:
   - Check Vercel logs for any errors
   - Check browser console for JavaScript errors

## Maintenance

### Viewing Contact Submissions

1. Log into Supabase
2. Go to the `contact_submissions` table
3. View all submitted forms
4. Export data as needed (CSV, etc.)

### Updating Content

To update the website content (copy, contact info, etc.):

1. Edit the relevant JSX component in `src/components/`
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update [section] content"
   git push
   ```
3. Vercel automatically deploys the changes

### Monitoring

Set up monitoring in Vercel:
- Go to Analytics
- Monitor traffic and errors
- Set up email alerts for deployment failures

## Troubleshooting

**Form submissions not working**:
- Check Vercel logs for API errors
- Verify Supabase credentials are correct
- Test API route directly: `POST /api/contact`

**Emails not being sent**:
- Verify EmailJS credentials
- Check EmailJS dashboard for failed sends
- Ensure email template variables match the API route

**Domain not pointing correctly**:
- Wait 24-48 hours for DNS propagation
- Check DNS status at whatsmydns.net
- Verify Vercel shows domain as verified

## Support

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- EmailJS Docs: https://www.emailjs.com/docs
