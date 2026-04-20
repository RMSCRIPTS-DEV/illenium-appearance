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

## 🖼️ Clothing Images (Optional Dependency)

This redesigned UI can display real thumbnails for every clothing item, prop, and appearance overlay. To generate them, we recommend **[uz_AutoShot](https://github.com/uz-scripts/uz_AutoShot)** — a free all-in-one screenshot studio that produces transparent PNGs for clothing, props, vehicles, and objects.

### Quick Setup

1. **Download** [uz_AutoShot](https://github.com/uz-scripts/uz_AutoShot) and drop the folder into your `resources` directory. The folder must be named exactly `uz_AutoShot`.
2. **Add to `server.cfg`** (make sure `screenshot-basic` starts first):
   ```
   ensure screenshot-basic
   ensure uz_AutoShot
   ensure illenium-appearance
   ```
3. **Start the server.** Node dependencies install automatically on first boot (built-in `yarn` support required, artifacts 4892+).
4. **Grant yourself permission** (or set `Customize.AceRestricted = false` inside `uz_AutoShot/Customize.lua`):
   ```
   add_ace identifier.license:YOUR_LICENSE command.shotmaker allow
   add_ace identifier.license:YOUR_LICENSE command.wardrobe allow
   ```
5. **Generate the images** — in-game, run:
   ```
   /shotmaker
   ```
   Pick the **Clothing** and **Appearance Overlays** tabs, adjust the orbit camera if you want, and hit **Start**. It will automatically iterate every component/drawable/texture and save transparent PNGs into `uz_AutoShot/shots/`.
6. **Restart both resources** so the new images are indexed and picked up by the UI:
   ```
   restart uz_AutoShot
   restart illenium-appearance
   ```
7. Open the clothing menu — thumbnails should now appear next to every item. That's it.

> Tip: Re-run `/shotmaker` any time you add new clothing packs, then restart both resources again.

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


