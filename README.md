# RM Scripts - illenium-appearance Redesigned UI

A modern UI redesign of the popular illenium-appearance clothing system for FiveM.

<div align='center'> 
  <img src="https://i.imgur.com/IwWvJNp.png" alt="RM Scripts UI Redesign Preview" />
</div>

## 🎨 About This Project

This is a **complete UI redesign** of the original [illenium-appearance](https://github.com/iLLeniumStudios/illenium-appearance) resource. All core functionality remains intact while providing a fresh, modern interface.

## 🔓 Open Source

This project is **fully open source** - both the redesigned UI and all code modifications are freely available for the community to use and modify.

## 🙏 Original Credits

Built upon the excellent work of:
- **Original Script**: [fivem-appearance](https://github.com/pedr0fontoura/fivem-appearance) by pedr0fontoura
- **Tattoos Support**: [fivem-appearance](https://github.com/franfdezmorales/fivem-appearance) by franfdezmorales
- **QB Maintained Fork**: [aj-fivem-appearance](https://github.com/mirrox1337/aj-fivem-appearance) by mirrox1337
- **Core System**: [illenium-appearance](https://github.com/iLLeniumStudios/illenium-appearance) by iLLenium Studios

## 📖 Documentation

For installation and configuration, refer to the original documentation:  
**[illenium-appearance Documentation](https://docs.illenium.dev/free-resources/illenium-appearance/installation/)**

## 🖼️ Clothing Thumbnails (Optional Dependency)

This UI can display inline image thumbnails inside every clothing, prop, and head-overlay picker. Images are served from **[uz_AutoShot](https://github.com/uz-scripts/uz_AutoShot)** as a runtime dependency — no commands are registered on our side.

### Setup

1. Install **[uz_AutoShot](https://github.com/uz-scripts/uz_AutoShot)** by following its own README (the folder must be named exactly `uz_AutoShot`).
2. Make sure `uz_AutoShot` starts **before** `illenium-appearance` in your `server.cfg`:
   ```
   ensure screenshot-basic
   ensure uz_AutoShot
   ensure illenium-appearance
   ```
3. Capture the images using `uz_AutoShot`'s own commands (`/shotmaker`, `/wardrobe`, etc.) exactly as documented in its repo. Output lands in `uz_AutoShot/shots/<gender>/...`.
4. `restart uz_AutoShot` so FiveM re-registers the new PNGs for NUI access.
5. Open `illenium-appearance` and tap the small grid icon next to a **Drawable** label — tiles will appear. Toggle persists per-user in `localStorage`. If `uz_AutoShot` is not installed or the image is missing, tiles gracefully degrade to numeric placeholders.

> Tip: Re-run `/shotmaker` whenever you add new clothing packs, then `restart uz_AutoShot`.

## 💬 Support & Community

- **Our Discord**: [Join RM Scripts Discord](https://discord.com/invite/JuKgfmbCpQ)
- **Our Store**: [rm-scripts.dev](https://rm-scripts.dev)
- **Original Discord**: [illenium.dev Discord](https://discord.illenium.dev)
- **Issues**: Report bugs via GitHub Issues

## 📄 License

Maintains the same open-source license as the original illenium-appearance.

---

<div align='center'>
  <p>Made with ❤️ by RM Scripts | Based on illenium-appearance</p>
  <p>⭐ Star this repo if you find it useful!</p>
  <p>🛒 <a href="https://rm-scripts.dev">Visit Our Store</a> | 💬 <a href="https://discord.com/invite/JuKgfmbCpQ">Join Our Discord</a></p>
</div>


