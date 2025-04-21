import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircle,
  IconCircleCheck,
  IconCircleHelp,
  IconCircleOff,
  IconTimer,
} from "~/components/icons";

export const labels = [
  {
    label: "Bug",
    value: "bug",
  },
  {
    label: "Feature",
    value: "feature",
  },
  {
    label: "Documentation",
    value: "documentation",
  },
];

export const statuses = [
  {
    icon: IconCircleHelp,
    label: "Backlog",
    value: "backlog",
  },
  {
    icon: IconCircle,
    label: "Todo",
    value: "todo",
  },
  {
    icon: IconTimer,
    label: "In Progress",
    value: "in progress",
  },
  {
    icon: IconCircleCheck,
    label: "Done",
    value: "done",
  },
  {
    icon: IconCircleOff,
    label: "Canceled",
    value: "canceled",
  },
];

export const priorities = [
  {
    icon: IconArrowDown,
    label: "Low",
    value: "low",
  },
  {
    icon: IconArrowRight,
    label: "Medium",
    value: "medium",
  },
  {
    icon: IconArrowUp,
    label: "High",
    value: "high",
  },
];

export type Task = {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
};

export const tasks: Task[] = [
  {
    id: "TASK-8782",
    label: "documentation",
    priority: "medium",
    status: "in progress",
    title:
      "You can't compress the program without quantifying the open-source SSD pixel!",
  },
  {
    id: "TASK-7878",
    label: "documentation",
    priority: "medium",
    status: "backlog",
    title:
      "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
  },
  {
    id: "TASK-7839",
    label: "bug",
    priority: "high",
    status: "todo",
    title: "We need to bypass the neural TCP card!",
  },
  {
    id: "TASK-5562",
    label: "feature",
    priority: "medium",
    status: "backlog",
    title:
      "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
  },
  {
    id: "TASK-8686",
    label: "feature",
    priority: "medium",
    status: "canceled",
    title:
      "I'll parse the wireless SSL protocol, that should driver the API panel!",
  },
  {
    id: "TASK-1280",
    label: "bug",
    priority: "high",
    status: "done",
    title:
      "Use the digital TLS panel, then you can transmit the haptic system!",
  },
  {
    id: "TASK-7262",
    label: "feature",
    priority: "high",
    status: "done",
    title:
      "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
  },
  {
    id: "TASK-1138",
    label: "feature",
    priority: "medium",
    status: "in progress",
    title:
      "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
  },
  {
    id: "TASK-7184",
    label: "feature",
    priority: "low",
    status: "todo",
    title: "We need to program the back-end THX pixel!",
  },
  {
    id: "TASK-5160",
    label: "documentation",
    priority: "high",
    status: "in progress",
    title:
      "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
  },
  {
    id: "TASK-5618",
    label: "documentation",
    priority: "medium",
    status: "done",
    title:
      "Generating the driver won't do anything, we need to index the online SSL application!",
  },
  {
    id: "TASK-6699",
    label: "documentation",
    priority: "medium",
    status: "backlog",
    title:
      "I'll transmit the wireless JBOD capacitor, that should hard drive the SSD feed!",
  },
  {
    id: "TASK-2858",
    label: "bug",
    priority: "medium",
    status: "backlog",
    title: "We need to override the online UDP bus!",
  },
  {
    id: "TASK-9864",
    label: "bug",
    priority: "high",
    status: "done",
    title:
      "I'll reboot the 1080p FTP panel, that should matrix the HEX hard drive!",
  },
  {
    id: "TASK-8404",
    label: "bug",
    priority: "low",
    status: "in progress",
    title: "We need to generate the virtual HEX alarm!",
  },
  {
    id: "TASK-5365",
    label: "documentation",
    priority: "low",
    status: "in progress",
    title:
      "Backing up the pixel won't do anything, we need to transmit the primary IB array!",
  },
  {
    id: "TASK-1780",
    label: "documentation",
    priority: "high",
    status: "todo",
    title:
      "The CSS feed is down, index the bluetooth transmitter so we can compress the CLI protocol!",
  },
  {
    id: "TASK-6938",
    label: "documentation",
    priority: "high",
    status: "todo",
    title:
      "Use the redundant SCSI application, then you can hack the optical alarm!",
  },
  {
    id: "TASK-9885",
    label: "bug",
    priority: "high",
    status: "backlog",
    title: "We need to compress the auxiliary VGA driver!",
  },
  {
    id: "TASK-3216",
    label: "documentation",
    priority: "medium",
    status: "backlog",
    title:
      "Transmitting the transmitter won't do anything, we need to compress the virtual HDD sensor!",
  },
  {
    id: "TASK-9285",
    label: "bug",
    priority: "high",
    status: "todo",
    title:
      "The IP monitor is down, copy the haptic alarm so we can generate the HTTP transmitter!",
  },
  {
    id: "TASK-1024",
    label: "documentation",
    priority: "low",
    status: "in progress",
    title:
      "Overriding the microchip won't do anything, we need to transmit the digital OCR transmitter!",
  },
  {
    id: "TASK-7068",
    label: "bug",
    priority: "low",
    status: "canceled",
    title:
      "You can't generate the capacitor without indexing the wireless HEX pixel!",
  },
  {
    id: "TASK-6502",
    label: "bug",
    priority: "high",
    status: "todo",
    title:
      "Navigating the microchip won't do anything, we need to bypass the back-end SQL bus!",
  },
  {
    id: "TASK-5326",
    label: "bug",
    priority: "low",
    status: "todo",
    title: "We need to hack the redundant UTF8 transmitter!",
  },
  {
    id: "TASK-6274",
    label: "documentation",
    priority: "low",
    status: "canceled",
    title:
      "Use the virtual PCI circuit, then you can parse the bluetooth alarm!",
  },
  {
    id: "TASK-1571",
    label: "feature",
    priority: "medium",
    status: "in progress",
    title:
      "I'll input the neural DRAM circuit, that should protocol the SMTP interface!",
  },
  {
    id: "TASK-9518",
    label: "documentation",
    priority: "medium",
    status: "canceled",
    title:
      "Compressing the interface won't do anything, we need to compress the online SDD matrix!",
  },
  {
    id: "TASK-5581",
    label: "documentation",
    priority: "high",
    status: "backlog",
    title:
      "I'll synthesize the digital COM pixel, that should transmitter the UTF8 protocol!",
  },
  {
    id: "TASK-2197",
    label: "documentation",
    priority: "low",
    status: "todo",
    title:
      "Parsing the feed won't do anything, we need to copy the bluetooth DRAM bus!",
  },
  {
    id: "TASK-8484",
    label: "bug",
    priority: "low",
    status: "in progress",
    title: "We need to parse the solid state UDP firewall!",
  },
  {
    id: "TASK-9892",
    label: "documentation",
    priority: "high",
    status: "done",
    title:
      "If we back up the application, we can get to the UDP application through the multi-byte THX capacitor!",
  },
  {
    id: "TASK-9616",
    label: "feature",
    priority: "medium",
    status: "in progress",
    title: "We need to synthesize the cross-platform ASCII pixel!",
  },
  {
    id: "TASK-9744",
    label: "documentation",
    priority: "low",
    status: "done",
    title:
      "Use the back-end IP card, then you can input the solid state hard drive!",
  },
  {
    id: "TASK-1376",
    label: "documentation",
    priority: "low",
    status: "backlog",
    title:
      "Generating the alarm won't do anything, we need to generate the mobile IP capacitor!",
  },
  {
    id: "TASK-7382",
    label: "feature",
    priority: "low",
    status: "todo",
    title:
      "If we back up the firewall, we can get to the RAM alarm through the primary UTF8 pixel!",
  },
  {
    id: "TASK-2290",
    label: "documentation",
    priority: "high",
    status: "canceled",
    title:
      "I'll compress the virtual JSON panel, that should application the UTF8 bus!",
  },
  {
    id: "TASK-1533",
    label: "bug",
    priority: "high",
    status: "done",
    title:
      "You can't input the firewall without overriding the wireless TCP firewall!",
  },
  {
    id: "TASK-4920",
    label: "bug",
    priority: "high",
    status: "in progress",
    title:
      "Bypassing the hard drive won't do anything, we need to input the bluetooth JSON program!",
  },
  {
    id: "TASK-5168",
    label: "feature",
    priority: "low",
    status: "in progress",
    title:
      "If we synthesize the bus, we can get to the IP panel through the virtual TLS array!",
  },
  {
    id: "TASK-7103",
    label: "feature",
    priority: "low",
    status: "canceled",
    title: "We need to parse the multi-byte EXE bandwidth!",
  },
  {
    id: "TASK-4314",
    label: "bug",
    priority: "high",
    status: "in progress",
    title:
      "If we compress the program, we can get to the XML alarm through the multi-byte COM matrix!",
  },
  {
    id: "TASK-3415",
    label: "feature",
    priority: "high",
    status: "todo",
    title:
      "Use the cross-platform XML application, then you can quantify the solid state feed!",
  },
  {
    id: "TASK-8339",
    label: "feature",
    priority: "low",
    status: "in progress",
    title:
      "Try to calculate the DNS interface, maybe it will input the bluetooth capacitor!",
  },
  {
    id: "TASK-6995",
    label: "feature",
    priority: "high",
    status: "todo",
    title:
      "Try to hack the XSS bandwidth, maybe it will override the bluetooth matrix!",
  },
  {
    id: "TASK-8053",
    label: "feature",
    priority: "medium",
    status: "todo",
    title:
      "If we connect the program, we can get to the UTF8 matrix through the digital UDP protocol!",
  },
  {
    id: "TASK-4336",
    label: "documentation",
    priority: "low",
    status: "todo",
    title:
      "If we synthesize the microchip, we can get to the SAS sensor through the optical UDP program!",
  },
  {
    id: "TASK-8790",
    label: "bug",
    priority: "medium",
    status: "done",
    title:
      "I'll back up the optical COM alarm, that should alarm the RSS capacitor!",
  },
  {
    id: "TASK-8980",
    label: "bug",
    priority: "low",
    status: "canceled",
    title:
      "Try to navigate the SQL transmitter, maybe it will back up the virtual firewall!",
  },
  {
    id: "TASK-7342",
    label: "documentation",
    priority: "low",
    status: "backlog",
    title: "Use the neural CLI card, then you can parse the online port!",
  },
  {
    id: "TASK-5608",
    label: "documentation",
    priority: "low",
    status: "canceled",
    title:
      "I'll hack the haptic SSL program, that should bus the UDP transmitter!",
  },
  {
    id: "TASK-1606",
    label: "feature",
    priority: "medium",
    status: "done",
    title:
      "I'll generate the bluetooth PNG firewall, that should pixel the SSL driver!",
  },
  {
    id: "TASK-7872",
    label: "feature",
    priority: "medium",
    status: "canceled",
    title:
      "Transmitting the circuit won't do anything, we need to reboot the 1080p RSS monitor!",
  },
  {
    id: "TASK-4167",
    label: "bug",
    priority: "medium",
    status: "canceled",
    title:
      "Use the cross-platform SMS circuit, then you can synthesize the optical feed!",
  },
  {
    id: "TASK-9581",
    label: "documentation",
    priority: "low",
    status: "backlog",
    title:
      "You can't index the port without hacking the cross-platform XSS monitor!",
  },
  {
    id: "TASK-8806",
    label: "bug",
    priority: "medium",
    status: "done",
    title: "We need to bypass the back-end SSL panel!",
  },
  {
    id: "TASK-6542",
    label: "feature",
    priority: "low",
    status: "done",
    title:
      "Try to quantify the RSS firewall, maybe it will quantify the open-source system!",
  },
  {
    id: "TASK-6806",
    label: "documentation",
    priority: "low",
    status: "canceled",
    title:
      "The VGA protocol is down, reboot the back-end matrix so we can parse the CSS panel!",
  },
  {
    id: "TASK-9549",
    label: "feature",
    priority: "high",
    status: "todo",
    title: "You can't bypass the bus without connecting the neural JBOD bus!",
  },
  {
    id: "TASK-1075",
    label: "feature",
    priority: "medium",
    status: "done",
    title:
      "Backing up the driver won't do anything, we need to parse the redundant RAM pixel!",
  },
  {
    id: "TASK-1427",
    label: "documentation",
    priority: "high",
    status: "done",
    title:
      "Use the auxiliary PCI circuit, then you can calculate the cross-platform interface!",
  },
  {
    id: "TASK-1907",
    label: "documentation",
    priority: "high",
    status: "todo",
    title:
      "Hacking the circuit won't do anything, we need to back up the online DRAM system!",
  },
  {
    id: "TASK-4309",
    label: "bug",
    priority: "medium",
    status: "backlog",
    title:
      "If we generate the system, we can get to the TCP sensor through the optical GB pixel!",
  },
  {
    id: "TASK-3973",
    label: "feature",
    priority: "medium",
    status: "todo",
    title:
      "I'll parse the back-end ADP array, that should bandwidth the RSS bandwidth!",
  },
  {
    id: "TASK-7962",
    label: "bug",
    priority: "low",
    status: "canceled",
    title:
      "Use the wireless RAM program, then you can hack the cross-platform feed!",
  },
  {
    id: "TASK-3360",
    label: "feature",
    priority: "medium",
    status: "done",
    title:
      "You can't quantify the program without synthesizing the neural OCR interface!",
  },
  {
    id: "TASK-9887",
    label: "bug",
    priority: "medium",
    status: "backlog",
    title:
      "Use the auxiliary ASCII sensor, then you can connect the solid state port!",
  },
  {
    id: "TASK-3649",
    label: "feature",
    priority: "medium",
    status: "in progress",
    title:
      "I'll input the virtual USB system, that should circuit the DNS monitor!",
  },
  {
    id: "TASK-3586",
    label: "bug",
    priority: "low",
    status: "in progress",
    title:
      "If we quantify the circuit, we can get to the CLI feed through the mobile SMS hard drive!",
  },
  {
    id: "TASK-5150",
    label: "feature",
    priority: "medium",
    status: "canceled",
    title:
      "I'll hack the wireless XSS port, that should transmitter the IP interface!",
  },
  {
    id: "TASK-3652",
    label: "feature",
    priority: "low",
    status: "backlog",
    title:
      "The SQL interface is down, override the optical bus so we can program the ASCII interface!",
  },
  {
    id: "TASK-6884",
    label: "feature",
    priority: "high",
    status: "canceled",
    title:
      "Use the digital PCI circuit, then you can synthesize the multi-byte microchip!",
  },
  {
    id: "TASK-1591",
    label: "feature",
    priority: "high",
    status: "in progress",
    title: "We need to connect the mobile XSS driver!",
  },
  {
    id: "TASK-3802",
    label: "feature",
    priority: "low",
    status: "in progress",
    title:
      "Try to override the ASCII protocol, maybe it will parse the virtual matrix!",
  },
  {
    id: "TASK-7253",
    label: "bug",
    priority: "high",
    status: "backlog",
    title:
      "Programming the capacitor won't do anything, we need to bypass the neural IB hard drive!",
  },
  {
    id: "TASK-9739",
    label: "documentation",
    priority: "medium",
    status: "done",
    title: "We need to hack the multi-byte HDD bus!",
  },
  {
    id: "TASK-4424",
    label: "documentation",
    priority: "medium",
    status: "in progress",
    title:
      "Try to hack the HEX alarm, maybe it will connect the optical pixel!",
  },
  {
    id: "TASK-3922",
    label: "bug",
    priority: "low",
    status: "backlog",
    title:
      "You can't back up the capacitor without generating the wireless PCI program!",
  },
  {
    id: "TASK-4921",
    label: "bug",
    priority: "low",
    status: "canceled",
    title:
      "I'll index the open-source IP feed, that should system the GB application!",
  },
  {
    id: "TASK-5814",
    label: "bug",
    priority: "high",
    status: "backlog",
    title: "We need to calculate the 1080p AGP feed!",
  },
  {
    id: "TASK-2645",
    label: "documentation",
    priority: "medium",
    status: "todo",
    title:
      "Synthesizing the system won't do anything, we need to navigate the multi-byte HDD firewall!",
  },
  {
    id: "TASK-4535",
    label: "feature",
    priority: "low",
    status: "in progress",
    title:
      "Try to copy the JSON circuit, maybe it will connect the wireless feed!",
  },
  {
    id: "TASK-4463",
    label: "documentation",
    priority: "low",
    status: "done",
    title: "We need to copy the solid state AGP monitor!",
  },
  {
    id: "TASK-9745",
    label: "feature",
    priority: "high",
    status: "canceled",
    title:
      "If we connect the protocol, we can get to the GB system through the bluetooth PCI microchip!",
  },
  {
    id: "TASK-2080",
    label: "bug",
    priority: "medium",
    status: "todo",
    title:
      "If we input the bus, we can get to the RAM matrix through the auxiliary RAM card!",
  },
  {
    id: "TASK-3838",
    label: "bug",
    priority: "high",
    status: "backlog",
    title:
      "I'll bypass the online TCP application, that should panel the AGP system!",
  },
  {
    id: "TASK-1340",
    label: "bug",
    priority: "medium",
    status: "todo",
    title: "We need to navigate the virtual PNG circuit!",
  },
  {
    id: "TASK-6665",
    label: "feature",
    priority: "low",
    status: "canceled",
    title:
      "If we parse the monitor, we can get to the SSD hard drive through the cross-platform AGP alarm!",
  },
  {
    id: "TASK-7585",
    label: "feature",
    priority: "low",
    status: "backlog",
    title:
      "If we calculate the hard drive, we can get to the SSL program through the multi-byte CSS microchip!",
  },
  {
    id: "TASK-6319",
    label: "bug",
    priority: "high",
    status: "backlog",
    title: "We need to copy the multi-byte SCSI program!",
  },
  {
    id: "TASK-4369",
    label: "bug",
    priority: "high",
    status: "backlog",
    title: "Try to input the SCSI bus, maybe it will generate the 1080p pixel!",
  },
  {
    id: "TASK-9035",
    label: "documentation",
    priority: "low",
    status: "canceled",
    title: "We need to override the solid state PNG array!",
  },
  {
    id: "TASK-3970",
    label: "documentation",
    priority: "medium",
    status: "todo",
    title:
      "You can't index the transmitter without quantifying the haptic ASCII card!",
  },
  {
    id: "TASK-4473",
    label: "documentation",
    priority: "low",
    status: "todo",
    title:
      "You can't bypass the protocol without overriding the neural RSS program!",
  },
  {
    id: "TASK-4136",
    label: "bug",
    priority: "medium",
    status: "canceled",
    title:
      "You can't hack the hard drive without hacking the primary JSON program!",
  },
  {
    id: "TASK-3939",
    label: "feature",
    priority: "low",
    status: "done",
    title:
      "Use the back-end SQL firewall, then you can connect the neural hard drive!",
  },
  {
    id: "TASK-2007",
    label: "bug",
    priority: "high",
    status: "backlog",
    title:
      "I'll input the back-end USB protocol, that should bandwidth the PCI system!",
  },
  {
    id: "TASK-7516",
    label: "documentation",
    priority: "medium",
    status: "done",
    title:
      "Use the primary SQL program, then you can generate the auxiliary transmitter!",
  },
  {
    id: "TASK-6906",
    label: "feature",
    priority: "high",
    status: "done",
    title:
      "Try to back up the DRAM system, maybe it will reboot the online transmitter!",
  },
  {
    id: "TASK-5207",
    label: "bug",
    priority: "low",
    status: "in progress",
    title:
      "The SMS interface is down, copy the bluetooth bus so we can quantify the VGA card!",
  },
];
