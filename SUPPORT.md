# Support

## 🆘 Getting Help

### Before Opening an Issue
1. Check the [FAQ section](#faq) below
2. Search [existing issues](https://github.com/yamiSukehiro2907/studi.io/issues)
3. Review the [documentation](https://github.com/yamiSukehiro2907/studi.io#readme)

### Ways to Get Help

#### 💬 GitHub Discussions
Best for: Questions, ideas, and community discussions
👉 [Start a Discussion](https://github.com/yamiSukehiro2907/studi.io/discussions)

#### 🐛 Bug Reports
Best for: Reporting bugs and issues
👉 [Report a Bug](https://github.com/yamiSukehiro2907/studi.io/issues/new?template=bug_report.md)

#### ✨ Feature Requests
Best for: Suggesting new features
👉 [Request a Feature](https://github.com/yamiSukehiro2907/studi.io/issues/new?template=feature_request.md)

#### 📧 Email Support
Best for: Private inquiries, partnerships, security issues
📬 studi.io2907@gmail.com

### Response Times
- **Critical bugs:** Within 24-48 hours
- **General issues:** Within 3-5 days
- **Feature requests:** We review monthly
- **Questions:** Usually within 1-2 days

## ❓ FAQ

### Installation Issues

**Q: I get "Module not found" errors**
A: Run `npm install` in both client and server directories.

**Q: MongoDB connection fails**
A: Check your CONNECTION_STRING in .env and ensure MongoDB is running.

**Q: Port already in use**
A: Change the PORT in your .env file or kill the process using that port.

### Authentication Issues

**Q: Login fails with correct credentials**
A: Ensure your email is verified. Check your spam folder for the OTP email.

**Q: Tokens expire too quickly**
A: Check ACCESS_TOKEN_EXPIRATION and REFRESH_TOKEN_EXPIRATION in .env.

### Real-time Chat Issues

**Q: Messages not appearing in real-time**
A: Check browser console for Socket.IO connection errors. Ensure CORS is properly configured.

**Q: Socket connection fails**
A: Verify ALLOWED_ORIGINS in server .env includes your frontend URL.

### Deployment Issues

**Q: Environment variables not working in production**
A: Ensure all required env vars are set in your hosting platform.

**Q: Images not uploading**
A: Verify Cloudinary credentials and check file size limits (max 5MB).

## 🔧 Self-Service Resources

- **Setup Guide:** [README.md](https://github.com/yamiSukehiro2907/studi.io#-getting-started)
- **API Documentation:** [README.md](https://github.com/yamiSukehiro2907/studi.io#-api-documentation)
- **Contributing Guide:** [CONTRIBUTING.md](CONTRIBUTING.md)
- **Code of Conduct:** [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

## 🤝 Community

Join our community:
- [GitHub Discussions](https://github.com/yamiSukehiro2907/studi.io/discussions)
- Star the project on [GitHub](https://github.com/yamiSukehiro2907/studi.io)
- Share feedback and ideas

## 🔒 Security

Found a security vulnerability? Please email vimalyadavkr001@gmail.com directly.
Do not open a public issue for security concerns.

---

**Need more help?** Don't hesitate to reach out! We're here to help. 💚
