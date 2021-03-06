import { ControlSlider } from "./components/ControlSlider";
import { ControlDropdown } from "./components/ControlDropdown";
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
        options: ["No Ceiling Fans [$0]", "Ceiling Fans (+1C to Cooling Setpoint) [$5]"],
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
        options: ["R3 [$0.03/m2]", "R5 [$0.06/m2]", "R7 [$0.09/m2]", "R10 [0.12/m2]"],
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
        options: ["Basic Construction Tightness 0.4 ACH [$0]", "Tight Envelope Construction 0.1 ACH [$6]"],
        title: () => "Envelope Tightness",
      },
    },
  },
  shading: {
    tableTitle: "Shading",
    component: ControlSlider,
    config: {
      title: (param, value) => `${param.toUpperCase()} Shading Depth: ${value.toFixed(2)}m `,
      range: [0, 1.5],
      step: 0.01,
    },
  },
  wwr: {
    tableTitle: "Window-to-Wall Ratios",
    component: ControlSlider,
    config: {
      title: (param, value) => `${param.toUpperCase()} Facade: ${(value * 100).toFixed(0)}%`,
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
        options: ["Block", "O-Shaped", "U-Shaped"],
      },
    },
    orientation: {
      component: ControlSlider,
      config: {
        title: (param, value) => `Orientation: `,
        range: [0, 3],
        step: [1],
      },
      conditional: (building) => building.mass.type >= 2,
    },
    cutoutDepth: {
      component: ControlSlider,
      config: {
        title: (param, value) => `Cutout Depth: ${(value * 100).toFixed(0)}%`,
        range: [0, 1],
        step: [0.01],
      },
      conditional: (building) => building.mass.type >= 1,
    },
    cutoutWidth: {
      component: ControlSlider,
      config: {
        title: (param, value) => `Cutout Width: ${(value * 100).toFixed(0)}%`,
        range: [0, 1],
        step: [0.01],
      },
      conditional: (building) => building.mass.type >= 1,
    },
    floors: {
      component: ControlSlider,
      config: {
        title: (param, value) => `Floors: ${value.toFixed(0)}`,
        range: [1, 25],
        step: 1,
      },
    },
    floorHeight: {
      component: ControlSlider,
      config: {
        title: (param, value) => `Floor Height: ${value.toFixed(1)}m`,
        range: [2.5, 5],
        step: 0.01,
      },
    },
    width: {
      component: ControlSlider,
      config: {
        title: (param, value) => `Width: ${value.toFixed(1)}m`,
        range: [3, 50],
        step: 0.01,
      },
    },
    depth: {
      component: ControlSlider,
      config: {
        title: (param, value) => `Depth: ${value.toFixed(1)}m`,
        range: [3, 50],
        step: 0.01,
      },
    },
  },
  sun: {
    tableTitle: "Sun",
    month: {
      component: ControlSlider,
      config: {
        title: (param, value) =>
          `${
            [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "November",
              "December",
            ][value - 1]
          }`,
        range: [1, 12],
        step: 1,
      },
    },
    day: {
      component: ControlSlider,
      config: {
        title: (param, value) => `${value}`,
        range: [1, 28],
        step: 1, //TODO: Allow 31 days
      },
    },
    hour: {
      component: ControlSlider,
      config: {
        title: (param, value) =>
          `${String(Math.floor(value) % 12 === 0 ? "12" : Math.floor(value) % 12).padStart(2, "0")}:${String(
            Math.floor((((value * 100) % 100) / 100) * 60)
          ).padStart(2, "0")} ${value >= 12 ? "PM" : "AM"}`,
        range: [4, 22],
        step: 0.01,
      },
    },
    // inclination: {
    //   component: ControlSlider,
    //   config: {
    //     title: (param, value) =>
    //       `Inclination: ${((value * 180) / Math.PI)
    //         .toFixed(1)
    //         .padStart(5, "0")}deg`,
    //     range: [0, Math.PI],
    //     step: 0.01,
    //   },
    // },
    // azimuth: {
    //   component: ControlSlider,
    //   config: {
    //     title: (param, value) =>
    //       `Azimuth: ${((value * 180) / Math.PI)
    //         .toFixed(1)
    //         .padStart(5, "0")}deg`,
    //     range: [0, 2 * Math.PI],
    //     step: 0.01,
    //   },
    // },
  },
  positioning: {
    tableTitle: "Positioning",
    x: {
      component: ControlSlider,
      config: {
        title: (param, value) => `X Offset: ${value.toFixed(0)}m`,
        range: [-100, 100],
        step: 1,
      },
    },
    y: {
      component: ControlSlider,
      config: {
        title: (param, value) => `Y Offset: ${value.toFixed(0)}m`,
        range: [-100, 100],
        step: 1,
      },
    },
  },
};
