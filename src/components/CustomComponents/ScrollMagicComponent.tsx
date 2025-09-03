import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollMagicComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panel1Ref = useRef<HTMLDivElement | null>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

 useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.set(panel2Ref.current, { opacity: 0 });

    ScrollTrigger.create({
  trigger: containerRef.current,
  start: "top top",
  end: "top top",
  onUpdate: (self) => {
    if (!img1Ref.current) return;
    
    const currentWidth = img1Ref.current.offsetWidth;
    const originalWidth = img1Ref.current.parentElement?.offsetWidth || 1;
    const widthPercent = (currentWidth / originalWidth) * 100;
    
    console.log(widthPercent)
    if (widthPercent > 80) {
      if (self.direction === 1) { 
        gsap.set(".animate_title.title-2", { opacity: 0 });
      } else if (self.direction === -1) { 
        gsap.set(".animate_title.title-2", { opacity: 1 });
      }
    }
  }
});

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=200%",
        scrub: 1,
        pin: true,
        anticipatePin: 3.5,
        pinSpacing: false, 

      
      },
    });

    tl.to(panel1Ref.current, { opacity: 0 }, 0)
      .to(img1Ref.current, {
        width: '1500%',
        opacity: 0,
  duration: 0.4
      }, 0)
      .to(panel2Ref.current, {
        opacity: 1,
        duration: 0.4,
        onStart: () => {
          panel2Ref.current?.classList.add('isactive');
          panel2Ref.current?.querySelector('.animate_title')?.classList.add('isactive');
        },
      }, 0.3);

  }, containerRef);

  return () => ctx.revert();
}, []);


  return (
    <div className="desktopview" ref={containerRef}style={{
  overflow: 'hidden',
}} >
      <div className="body-content">
        <div id="block-section-3b" className="ui-container lazy" data-src="">
          <div className="row-wide">
            <div className="block-content">
              <div className="col-sm-12">
                <div className="col-sm-12">
                  <div className="content-module rte-inline col-sm-12 col-xs-12 module">
                    <div 
                      ref={spacerRef}
                      className="scrollmagic-pin-spacer"
                      style={{
                        display: 'block',
                        position: 'relative',
                        boxSizing: 'content-box',
                        width: '100%',
                        minHeight: '100vh'
                      }}
                    >
                      <div className="section-container section-container-2" style={{
                        position: 'relative',
                        width: '100%',
                        height: '100vh' 
                      }}>
                        <div 
                          ref={panel1Ref}
                          className="panel panel-1"
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            backgroundImage: 'url("/images/hand-bg.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 1,
                            zIndex: 2,
                            willChange: 'opacity, transform',
                              transformStyle: 'preserve-3d',
                                transform: 'translateZ(0)',
                                backfaceVisibility: 'hidden'


                          }}
                        >
                          <img 
                            ref={img1Ref}
                            src="/images/scroll.svg" 
                            className="img-1" 
                            alt=""
                            style={{ width: '100%' }} 
                          />
                          <div className="row new-row height-inherit">
                            <div className="join-us">
                              <div className="animate_subtitle animate_title title-2" style={{opacity: 1, transition: 'opacity 0.3s ease' }}>
                                We have Empanelment with <br />
                                recognised parent body
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          ref={panel2Ref}
                          className="panel panel-2"
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            opacity: 0,
                            zIndex: 1,
                            overflow: 'hidden'
                          }}
                        >
                          <div 
  ref={img3Ref}
  className="img-3" 
  style={{ 
    position: 'absolute',
    width: '100%', // Set to 100% by default
    height: '100%', // Set to 100% by default
    backgroundImage: 'url("/images/hand-bg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }} 
/>
                          <div className="animate_title title-1 careers">
                            <div className="elem15">
                              <div className="container custom_container">
                                <div className="row">
                                  <div className="col-sm-6 col-md-4 col-lg-3">
                                    <div className="elem15__imgwrap">
                                      <div className="elem15__imgwrap-item">
                                        <img src="/images/logo/digital-india.png" className="u-img" />
                                      </div>
                                      <div className="elem15__imgwrap-item">
                                        <img src="/images/logo/eadcil.png" className="u-img" />
                                      </div>
                                      <div className="elem15__imgwrap-item">
                                        <img src="/images/logo/csc.png" className="u-img" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6 col-md-4 col-lg-3">
                                    <div className="elem15__imgwrap">
                                      <div className="elem15__imgwrap-item">
                                        <img src="/images/logo/negd.png" className="u-img" />
                                      </div>
                                      <div className="elem15__imgwrap-item">
                                        <img src="/images/logo/digiyatra.png" className="u-img" />
                                      </div>
                                      <div className="elem15__imgwrap-item">
                                        <img src="/images/logo/nic-2.png" className="u-img" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-4 col-lg-6">
                                    <div className="elem15__contentwrap">
                                      <h3 className="elem15__contentwrap-head">
                                        Empaneled Vendor with Nodal Agencies &amp; Govt. Departments
                                      </h3>
                                      <p className="elem15__contentwrap-disc">
                                        We strive to earn and keep the trust of our clients, in accordance with the highest standards of corporate conduct. In recognition of our ability, we are recognized by reputed bodies.                                      </p>
                                      <p className="elem15__contentwrap-disc">
                                        The Gateway of Govt. Business, Vendor empanelment in Govt. Departments and Nodal Agencies is a supply chain management in Govt. Business.                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollMagicComponent;