const residue = {
  nodes: [
    {"id":1000,"atom":"HE22"},
    {"id":991,"atom":"C"},
    {"id":997,"atom":"NE2"},
    {"id":990,"atom":"CA"},
    {"id":995,"atom":"CD"},
    {"id":996,"atom":"OE1"},
    {"id":993,"atom":"CB"},
    {"id":992,"atom":"O"},
    {"id":994,"atom":"CG"},
    {"id":999,"atom":"HE21"},
    {"id":989,"atom":"N"},
    {"id":998,"atom":"H"}
  ],
  links: [
    { id: 0, "source":989,"target":990,"bond":1, strength: 1, distance: 30.0 },
    { id: 1, "source":989,"target":998,"bond":1, strength: 1, distance: 30.0 },
    { id: 2, "source":990,"target":991,"bond":1, strength: 1, distance: 30.0 },
    { id: 3, "source":990,"target":993,"bond":1, strength: 1, distance: 30.0 },
    { id: 4, "source":991,"target":992,"bond":2, strength: 1, distance: 30.0 },
    { id: 5, "source":993,"target":994,"bond":1, strength: 1, distance: 30.0 },
    { id: 6, "source":994,"target":995,"bond":1, strength: 1, distance: 30.0 },
    { id: 7, "source":995,"target":997,"bond":1, strength: 1, distance: 30.0 },
    { id: 8, "source":995,"target":996,"bond":2, strength: 1, distance: 30.0 },
    { id: 9, "source":997,"target":1000,"bond":1, strength: 1, distance: 30.0 },
    { id: 10, "source":997,"target":999,"bond":1, strength: 1, distance: 30.0 }
  ],
};

export default residue;
