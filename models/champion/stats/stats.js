class Stats {
  constructor ({ hp, hpperlevel, mp, mpperlevel, movespeed, armor, armorperlevel, spellblock, spellblockperlevel, attackrange, hpregen, hpregenperlevel, mpregen, mpregenperlevel, crit, critperlevel, attackdamage, attackdamageperlevel, attackspeedoffset, attackspeedperlevel }) {
    this._hp = hp;
    this._hpperlevel = hpperlevel;
    this._mp = mp;
    this._mpperlevel = mpperlevel;
    this._movespeed = movespeed;
    this._armor = armor;
    this._armorperlevel = armorperlevel;
    this._spellblock = spellblock;
    this._spellblockperlevel = spellblockperlevel;
    this._attackrange = attackrange;
    this._hpregen = hpregen;
    this._hpregenperlevel = hpregenperlevel;
    this._mpregen = mpregen;
    this._mpregenperlevel = mpregenperlevel;
    this._crit = crit;
    this._critperlevel = critperlevel;
    this._attackdamage = attackdamage;
    this._attackdamageperlevel = attackdamageperlevel;
    this._attackspeedoffset = attackspeedoffset;
    this._attackspeedperlevel = attackspeedperlevel;
  }

  get hp () {
    return this._hp;
  }

  get hpperlevel () {
    return this._hpperlevel;
  }

  get mp () {
    return this._mp;
  }

  get mpperlevel () {
    return this._mpperlevel;
  }

  get movespeed () {
    return this._movespeed;
  }

  get armor () {
    return this._armor;
  }

  get armorperlevel () {
    return this._armorperlevel;
  }

  get spellblock () {
    return this._spellblock;
  }

  get spellblockperlevel () {
    return this._spellblockperlevel;
  }

  get attackrange () {
    return this._attackrange;
  }

  get hpregen () {
    return this._hpregen;
  }

  get hpregenperlevel () {
    return this._hpregenperlevel;
  }

  get mpregen () {
    return this._mpregen;
  }

  get mpregenperlevel () {
    return this._mpregenperlevel;
  }

  get crit () {
    return this._crit;
  }

  get critperlevel () {
    return this._critperlevel;
  }

  get attackdamage () {
    return this._attackdamage;
  }

  get attackdamageperlevel () {
    return this._attackdamageperlevel;
  }

  get attackspeedoffset () {
    return this._attackspeedoffset;
  }

  get attackspeedperlevel () {
    return this._attackspeedperlevel;
  }

  toJSON () {
    return {
      hp: this._hp,
      hpperlevel: this._hpperlevel,
      mp: this._mp,
      mpperlevel: this._mpperlevel,
      movespeed: this._movespeed,
      armor: this._armor,
      armorperlevel: this._armorperlevel,
      spellblock: this._spellblock,
      spellblockperlevel: this._spellblockperlevel,
      attackrange: this._attackrange,
      hpregen: this._hpregen,
      hpregenperlevel: this._hpregenperlevel,
      mpregen: this._mpregen,
      mpregenperlevel: this._mpregenperlevel,
      crit: this._crit,
      critperlevel: this._critperlevel,
      attackdamage: this._attackdamage,
      attackdamageperlevel: this._attackdamageperlevel,
      attackspeedoffset: this._attackspeedoffset,
      attackspeedperlevel: this._attackspeedperlevel
    };
  }
}

export default Stats;
