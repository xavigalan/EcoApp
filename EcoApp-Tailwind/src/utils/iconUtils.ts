import L from 'leaflet';
import { ReportType } from '../types';

import contenedordebasura from '../assets/home-furniture.png';
import wastecenter from '../assets/LogoSolo.png';
import textile from '../assets/ropa.png';
import selected from '../assets/selected.png';
import poda from '../assets/arbol.png';
import basura from '../assets/bolsabasura.png';
import events from '../assets/events.png';

/* Icons */
import fornuteIcon from '../assets/home-furniture.png';
import othersIcon from '../assets/camion-de-la-basura.png'; /* El que funciona es othersIcon */
import personIcon from '../assets/personIcon.png';


const ICON_SIZES = {
  DEFAULT: [32, 32] as [number, number],
  LARGE: [38, 40] as [number, number],
  PERSON: [50, 50] as [number, number],
};

const ICON_ANCHORS = {
  DEFAULT: [16, 32] as [number, number],
};

const POPUP_ANCHORS = {
  DEFAULT: [0, -32] as [number, number],
};

const reportTypeIcons: Record<ReportType, string> = {
  furniture: fornuteIcon,
  tree: poda,
  event: events,
  trash: basura,
};

const staticIcons: Record<string, L.Icon> = {
  Container: createIcon(contenedordebasura),
  'Textile container': createIcon(textile),
  'Waste center': createIcon(wastecenter),
  Others: createIcon(othersIcon),
  Fornute: createIcon(fornuteIcon),
  person: createIcon(personIcon, ICON_SIZES.PERSON),
  selected: createIcon(selected, ICON_SIZES.LARGE),
};

function createIcon(iconUrl: string, size = ICON_SIZES.DEFAULT): L.Icon {
  return L.icon({
    iconUrl,
    iconSize: size,
    iconAnchor: ICON_ANCHORS.DEFAULT,
    popupAnchor: POPUP_ANCHORS.DEFAULT,
  });
}

export function getIconByType(type: string, reportType?: ReportType): L.Icon {
  if (type === 'selected' && reportType && reportType in reportTypeIcons) {
    return createIcon(reportTypeIcons[reportType], ICON_SIZES.LARGE);
  }

  return staticIcons[type] || createIcon('/default-icon.png');
}