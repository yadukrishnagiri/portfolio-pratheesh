import { useEffect, useRef, useState } from 'react'
import type * as Leaflet from 'leaflet'
import { ArrowUpRight } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

type Area = { id: string; name: string; region: string; coordinates: [number, number] }

const areas: Area[] = [
  { id: 'liverpool', name: 'Liverpool', region: 'North West England', coordinates: [53.4084, -2.9916] },
  { id: 'london', name: 'London', region: 'South East England', coordinates: [51.5072, -0.1276] },
  { id: 'brighton', name: 'Brighton', region: 'South Coast', coordinates: [50.8225, -0.1372] },
]

const bounds = areas.map((area) => area.coordinates)

export default function ServiceAreaMap() {
  const elementRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Leaflet.Map | null>(null)
  const markersRef = useRef<Record<string, Leaflet.CircleMarker>>({})
  const selectedRef = useRef<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    let disposed = false
    let resizeObserver: ResizeObserver | null = null

    const observer = new IntersectionObserver(async (entries) => {
      if (disposed || !entries.some((entry) => entry.isIntersecting) || mapRef.current) return
      observer.disconnect()
      const L = await import('leaflet')
      if (disposed || mapRef.current) return

      const map = L.map(element, {
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        boxZoom: false,
        keyboard: false,
        zoomControl: false,
      })
      mapRef.current = map
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map)
      map.fitBounds(bounds, { padding: [56, 56], maxZoom: 7, animate: false })

      areas.forEach((area) => {
        const marker = L.circleMarker(area.coordinates, {
          radius: 8,
          color: '#fff',
          weight: 3,
          fillColor: '#283c35',
          fillOpacity: 1,
          interactive: false,
        }).addTo(map)
        marker.bindTooltip(area.name, {
          permanent: true,
          direction: 'top',
          offset: [0, -12],
          className: 'service-area-tooltip',
        })
        markersRef.current[area.id] = marker
      })

      const initialArea = areas.find((area) => area.id === selectedRef.current)
      if (initialArea) {
        markersRef.current[initialArea.id].setRadius(11)
        markersRef.current[initialArea.id].setStyle({ fillColor: '#536d67' })
        map.setView(initialArea.coordinates, 9, { animate: false })
      }

      resizeObserver = new ResizeObserver(() => {
        map.invalidateSize({ animate: false })
        const selectedArea = areas.find((area) => area.id === selectedRef.current)
        if (selectedArea) map.setView(selectedArea.coordinates, 9, { animate: false })
        else map.fitBounds(bounds, { padding: [62, 62], maxZoom: 7, animate: false })
      })
      resizeObserver.observe(element)
    }, { rootMargin: '120px' })

    observer.observe(element)
    return () => {
      disposed = true
      observer.disconnect()
      resizeObserver?.disconnect()
      mapRef.current?.remove()
      mapRef.current = null
      markersRef.current = {}
    }
  }, [])

  function selectArea(area: Area) {
    selectedRef.current = area.id
    setSelectedId(area.id)
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      marker.setRadius(id === area.id ? 11 : 8)
      marker.setStyle({ fillColor: id === area.id ? '#536d67' : '#283c35' })
    })
    const map = mapRef.current
    if (!map) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) map.setView(area.coordinates, 9, { animate: false })
    else map.flyTo(area.coordinates, 9, { duration: 0.7 })
  }

  function showAll() {
    selectedRef.current = null
    setSelectedId(null)
    Object.values(markersRef.current).forEach((marker) => {
      marker.setRadius(8)
      marker.setStyle({ fillColor: '#283c35' })
    })
    mapRef.current?.fitBounds(bounds, {
      padding: [56, 56],
      maxZoom: 7,
      animate: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
  }

  return <section className="areas-section section-pad" id="areas" aria-labelledby="areas-title">
    <div className="container">
      <div className="areas-heading"><div><h2 id="areas-title">Liverpool, London & Brighton — in view.</h2><p>Choose a city to bring it into focus, or return to the wider map.</p></div><span className="draft-pill">Example locations</span></div>
      <p className="areas-disclaimer">Liverpool, London and Brighton are preview locations chosen for this design. Pratheesh’s actual service area and travel range have not been confirmed.</p>
      <div className="areas-layout">
        <div className="areas-list" aria-label="Example locations">
          {areas.map((area, index) => <button className={selectedId === area.id ? 'area-row is-active' : 'area-row'} type="button" key={area.id} onClick={() => selectArea(area)} aria-pressed={selectedId === area.id}>
            <span className="area-index">{String(index + 1).padStart(2, '0')}</span><span className="area-copy"><strong>{area.name}</strong><small>{area.region}</small></span><ArrowUpRight className="area-arrow" size={21} aria-hidden="true" />
          </button>)}
          <button className="show-all-areas" type="button" onClick={showAll}>View all example locations</button>
        </div>
        <div className="area-map-wrap"><div className="area-map" ref={elementRef} aria-hidden="true" /><span className="map-corner-label">Coverage preview / UK</span><a className="map-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a></div>
      </div>
    </div>
  </section>
}
