import fs from "fs"

const baseDomain = "https://d3d57fbyf4vdnc.cloudfront.net"

const testPaths = [
  "banco_imagenes/05-salas/",
  "banco_imagenes/04-equipos/",
  "banco_imagenes/03-productos/",
  "banco_imagenes/equipos/",
  "banco_imagenes/salas/",
  "banco_imagenes/"
]

const testNames = [
  // Mount 2
  "i3CONNECT_Mount 2",
  "i3CONNECT_Mount_2",
  "i3CONNECT Mount 2",
  "i3CONNECT Mount_2",
  "i3CONNECT_Mount2",
  "i3CONNECT Mount2",
  "i3CONNECT-Mount-2",
  "i3CONNECT-Mount2",
  "Mount 2",
  "Mount2",
  "i3connect_mount_2",
  "i3connect_mount2",
  // ELM 2
  "i3CONNECT ELM 2_65",
  "i3CONNECT_ELM_2_65",
  "i3CONNECT ELM 2 65",
  "i3CONNECT_ELM2_65",
  "i3CONNECT ELM 2_85",
  "i3CONNECT ELM 2_86",
  "i3CONNECT_ELM_2_86",
  "i3CONNECT_ELM2_86",
  // T-Pod
  "T-Pod AIR Pro_Beamforming",
  "T-Pod_AIR_Pro_Beamforming",
  "T-Pod AIR Pro Beamforming",
  "T-Pod_AIR_Pro",
  "TPod_AIR_Pro_Beamforming",
  // MAXHUB
  "MAXHUB UC U50_Barra USB",
  "MAXHUB_UC_U50_Barra_USB",
  "MAXHUB UC U50 Barra USB",
  "MAXHUB_UC_U50",
  "MAXHUB UC U50",
]

const exts = [".webp", ".png", ".jpg", ".jpeg", ".PNG", ".WEBP", ".JPG"]

async function probe() {
  const found: string[] = []
  for (const name of testNames) {
    let nameFound = false
    for (const folder of testPaths) {
      if (nameFound) break
      for (const ext of exts) {
        const fullUrl = `${baseDomain}/${folder}${encodeURIComponent(name)}${ext}`
        try {
          const res = await fetch(fullUrl, { method: "GET" })
          if (res.status === 200) {
            console.log(`FOUND: ${fullUrl}`)
            found.push(fullUrl)
            nameFound = true
            break
          }
        } catch {}
      }
    }
    if (!nameFound) {
      console.log(`NOT FOUND for candidate stem: ${name}`)
    }
  }
}

probe()
