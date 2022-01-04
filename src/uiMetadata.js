import { ControlSlider } from "./ControlSlider";
import { ControlDropdown } from "./ControlDropdown";
export const uiMetadata = {
  glazing: {
    tableTitle: "Glazing",
    component: ControlDropdown,
    config: {
      options: [
        "Baseline (U2.5, SHGC 0.44, Tvis 0.66) [$0.02/m2]",
        "Low E / High Solar Gain (U1.3, SHGC 0.63, Tvis 0.50) [$0.04/m2]",
        "Low E / Low Solar Gain (U1.3, SHGC 0.22, Tvis 0.37) [$0.04/m2]",
        "Super Low E (U0.9, SHGC 0.40, Tvis 0.55) [$0.06/m2]",
      ],
      title: () => "Glazing",
    },
  },
  hvac: {
    tableTitle: "HVAC",
    source: {
      component: ControlDropdown,
      config: {
        options: [
          "Electric Baseboard Heating / Direct Expansion Cooling [$0]",
          "Gas Fired Boiler Heating / Direct Expansion Cooling [$6]",
          "Ground Source Heat Pump Heating and Cooling [$12]",
        ],
        title: () => "Heating and Cooling Mechanisms",
      },
    },
    hrv: {
      component: ControlDropdown,
      config: {
        options: ["No HRV [$0]", "HRV Sensible (70% Efficiency)  [$3]"],
        title: () => "Heat Recovery Ventilation",
      },
    },
    fans: {
      component: ControlDropdown,
      config: {
        options: [
          "No Ceiling Fans [$0]",
          "Ceiling Fans (+1C to Cooling Setpoint) [$5]",
        ],
        title: () => "Fans",
      },
    },
  },
  lighting: {
    tableTitle: "Lighting / Luminaires",
    dimming: {
      component: ControlDropdown,
      config: {
        options: ["No Dimming [$0]", "Daylight Dimming [$5]"],
        title: () => "Dimming",
      },
    },
    type: {
      component: ControlDropdown,
      config: {
        options: ["Fluorescent (11 W/m2) [$0]", "LED (6 W/m2) [$8]"],
        title: () => "Luminaire Technology",
      },
    },
  },
  envelope: {
    tableTitle: "Building Envelope",
    walls: {
      component: ControlDropdown,
      config: {
        options: ["R2.5 [$0.02/m2]", "R5.0 [$0.07/m2]", "R7.5 [$0.10/m2]"],
        title: () => "Walls",
      },
    },
    roofs: {
      component: ControlDropdown,
      config: {
        options: [
          "R3 [$0.03/m2]",
          "R5 [$0.06/m2]",
          "R7 [$0.09/m2]",
          "R10 [0.12/m2]",
        ],
        title: () => "Roof Slabs",
      },
    },
    floors: {
      component: ControlDropdown,
      config: {
        options: ["Wood [$0.00/m2]", "Concrete [$0.02/m2]"],
        title: () => "Floor Slabs",
      },
    },
    tightness: {
      component: ControlDropdown,
      config: {
        options: [
          "Basic Construction Tightness 0.4 ACH [$0]",
          "Tight Envelope Construction 0.1 ACH [$6]",
        ],
        title: () => "Envelope Tightness",
      },
    },
  },
  shading: {
    tableTitle: "Shading",
    component: ControlSlider,
    config: {
      title: (param) => `${param.toUpperCase()} Shading Depth (m)`,
      range: [0, 3],
      step: 0.01,
    },
  },
  wwr: {
    tableTitle: "Window-to-Wall Ratios",
    component: ControlSlider,
    config: {
      title: (param) => `${param.toUpperCase()} Facade (%)`,
      range: [0, 1],
      step: 0.01,
    },
  },
  mass: {
    tableTitle: "Massing",
    type: {
      component: ControlDropdown,
      config: {
        title: (param) => `Mass Type`,
        options: ["Block", "O-Shaped", "U-Shaped", "L-Shaped"],
      },
    },
    cutoutDepth: {
      component: ControlSlider,
      config: {
        title: (param) => `Cutout Depth`,
        range: [0, 1],
        step: [0.01],
      },
      conditional: (building) => building.mass.type >= 1,
    },
    cutoutWidth: {
      component: ControlSlider,
      config: {
        title: (param) => `Cutout Width`,
        range: [0, 1],
        step: [0.01],
      },
      conditional: (building) => building.mass.type >= 1,
    },
    floors: {
      component: ControlSlider,
      config: {
        title: (param) => `Floors (#)`,
        range: [1, 25],
        step: 1,
      },
    },
    floorHeight: {
      component: ControlSlider,
      config: {
        title: (param) => `Floor Height (m)`,
        range: [0, 3],
        step: 0.01,
      },
    },
    width: {
      component: ControlSlider,
      config: {
        title: (param) => `Width (m)`,
        range: [0, 3],
        step: 0.01,
      },
    },
    depth: {
      component: ControlSlider,
      config: {
        title: (param) => `Depth (m)`,
        range: [0, 3],
        step: 0.01,
      },
    },
  },
};
