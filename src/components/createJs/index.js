import React, { Component } from 'react';
import TweenOne from 'rc-tween-one';
import './index.scss';

class CreateJs extends Component {

  change() {
    const x = 100;
    const beer = 5;
    const pBeer = 3;
    const gBeer = 5;

    const a = x / beer;
    const pa = parseInt(a / pBeer, 10);
    const pas = a % pBeer;
    const ga = a / gBeer;
    const gas = a % gBeer;

    const b = pa + ga;
    const pb = (b + pas) / pBeer;
    const pbs = (b + pas) % pBeer;
    const gb = (b + gas) / gBeer;
    const gbs = (b + gas) % gBeer;

    const c = pb + gb;
    const pc = (c + pbs) / pBeer;
    const pcs = (c + pbs) % pBeer;
    const gc = parseInt((c + gbs) / gBeer, 10);
    const gcs = (c + gbs) % gBeer;

    const d = pc + gc;
    const pd = (d + pcs) / pBeer;
    const pds = (d + pcs) % pBeer;
    const gd = parseInt((d + gcs) / gBeer, 10);
    const gds = (d + gcs) % gBeer;

    const e = pd + gd;
    const pe = parseInt((e + pds) / pBeer, 10);
    const pes = parseInt((e + pds) % pBeer, 10);
    const ge = parseInt((e + gds) / gBeer, 10);
    const ges = parseInt((e + gds) % gBeer, 10);

    const f = pe + ge;
    const pf = parseInt((f + pes) / pBeer, 10);
    const pfs = parseInt((f + pes) % pBeer, 10);
    const gf = parseInt((f + ges) / gBeer, 10);
    const gfs = parseInt((f + ges) % gBeer, 10);

    console.log('a --- ', a);
    
    console.log('b --- ', b);
    
    console.log('c --- ', c);
    
    console.log('d --- ', d);
    
    console.log('e --- ', e);

    console.log('f --- ', f);
  }

  render() {
    this.change();
    const itemList = [
      {
        left: -75,
      },
      {
        left: -75,
        bottom: 50,
      },
      {
        left: 25,
        bottom: -75,
      },
      {
        left: 175,
        bottom: -75,
      },
      {
        right: 25,
        bottom: -75,
      },
      {
        right: -75,
        bottom: 50,
      },
      {
        right: -75,
      },
    ];

    return (
      <div className="wrap">
        <div className="box">
          <div className="left">left</div>
          <div className="right">right</div>
          {
            itemList.map((item, index) => (
              <div key={index} style={item} className="item-wrap" />
            ))
          }
          <TweenOne className="item" animation={{ left: '-75' }}>1</TweenOne>
          <TweenOne className="item" animation={{ left: '-75', bottom: 50 }}>2</TweenOne>
          <TweenOne className="item" animation={{ left: 25, bottom: '-75' }}>3</TweenOne>
          <TweenOne className="item" animation={{ left: 175, bottom: '-75' }}>4</TweenOne>
          <TweenOne className="item" animation={{ right: 25,  bottom: '-75' }}>5</TweenOne>
        </div>
      </div>
    );
  }
}

export default CreateJs;