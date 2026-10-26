import { useEffect, useRef, useState } from 'react'
import type * as Leaflet from 'leaflet'
import { ArrowUpRight, Building2, MapPin } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

type ServiceArea = {
  id: string
  county: string
  city: string
  cityCoordinates: [number, number]
  towns: string[]
}

const serviceAreas: ServiceArea[] = [
  {
    id: 'herefordshire',
    county: 'Herefordshire',
    city: 'Hereford',
    cityCoordinates: [52.0564, -2.7160],
    towns: ['Leominster', 'Ross-on-Wye', 'Ledbury', 'Bromyard', 'Kington'],
  },
  {
    id: 'worcestershire',
    county: 'Worcestershire',
    city: 'Worcester',
    cityCoordinates: [52.1920, -2.2200],
    towns: ['Malvern', 'Kidderminster', 'Redditch', 'Bromsgrove', 'Evesham', 'Droitwich Spa'],
  },
]
const bounds = serviceAreas.map((area) => area.cityCoordinates)

export default function ServiceAreaMap() {
  const elementRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Leaflet.Map | null>(null)
  const markersRef = useRef<Record<string, Leaflet.CircleMarker>>({})
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
      const map = L.map(element, { attributionControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, touchZoom: false, boxZoom: false, keyboard: false, zoomControl: false })
      mapRef.current = map
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map)
      map.fitBounds(bounds, { padding: [78, 78], maxZoom: 8, animate: false })
      L.polyline(bounds, { color: '#536d67', weight: 2, opacity: 0.72, dashArray: '7 10', interactive: false, className: 'service-connection-line' }).addTo(map)
      serviceAreas.forEach((area) => {
        const marker = L.circleMarker(area.cityCoordinates, { radius: 8, color: '#fff', weight: 3, fillColor: '#283c35', fillOpacity: 1, interactive: false }).addTo(map)
        marker.bindTooltip(area.city, { permanent: true, direction: 'top', offset: [0, -12], className: 'service-area-tooltip' })
        marker.getElement()?.classList.add('service-marker')
        markersRef.current[area.id] = marker
      })
      resizeObserver = new ResizeObserver(() => map.invalidateSize({ animate: false }))
      resizeObserver.observe(element)
    }, { rootMargin: '120px' })
    observer.observe(element)
    return () => { disposed = true; observer.disconnect(); resizeObserver?.disconnect(); mapRef.current?.remove(); mapRef.current = null; markersRef.current = {} }
  }, [])

  function selectArea(area: ServiceArea) {
    setSelectedId(area.id)
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const active = id === area.id
      marker.setRadius(active ? 11 : 8)
      marker.setStyle({ fillColor: active ? '#536d67' : '#283c35' })
      marker.getElement()?.classList.toggle('is-active', active)
    })
    mapRef.current?.setView(area.cityCoordinates, 9, { animate: !window.matchMedia('(prefers-reduced-motion: reduce)').matches })
  }

  function showAll() {
    setSelectedId(null)
    Object.values(markersRef.current).forEach((marker) => { marker.setRadius(8); marker.setStyle({ fillColor: '#283c35' }); marker.getElement()?.classList.remove('is-active') })
    mapRef.current?.fitBounds(bounds, { padding: [78, 78], maxZoom: 8, animate: !window.matchMedia('(prefers-reduced-motion: reduce)').matches })
  }

  return <section className="areas-section section-pad" id="areas" aria-labelledby="areas-title"><div className="container">
    <div className="areas-heading"><div><h2 id="areas-title">Hereford, Worcester & surrounding towns.</h2><p>Home visits are available across the counties of Herefordshire and Worcestershire—not only within the two cities.</p></div></div>
    <p className="areas-disclaimer">The places below are useful local reference points, not a complete boundary. Share your postcode when enquiring so Johnson can confirm travel and availability.</p>
    <div className="areas-layout"><div className="areas-list" aria-label="Home visit areas">
      {serviceAreas.map((area) => <button className={selectedId === area.id ? 'area-card is-active' : 'area-card'} type="button" key={area.id} onClick={() => selectArea(area)} aria-pressed={selectedId === area.id}>
        <span className="area-card-top"><span><MapPin size={17} aria-hidden="true" />{area.county}<small>County</small></span><ArrowUpRight size={20} aria-hidden="true" /></span>
        <span className="area-city"><Building2 size={18} aria-hidden="true" /><span><small>Principal city</small><strong>{area.city}</strong></span></span>
        <span className="town-list"><small>Including surrounding towns</small><span>{area.towns.join(' · ')}</span></span>
      </button>)}
      <button className="show-all-areas" type="button" onClick={showAll}>Show the full service area</button>
    </div><div className="area-map-wrap"><div className="area-map" ref={elementRef} role="img" aria-label="Map centred on the cities of Hereford and Worcester within the two-county home-visit area" /><span className="map-corner-label">Herefordshire & Worcestershire</span><a className="map-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a></div></div>
    </div>
  </section>
}
