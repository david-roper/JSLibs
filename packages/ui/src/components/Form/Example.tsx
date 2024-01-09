/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// Based on https://codepen.io/ederdiaz/pen/NBPWZp
// Modified original Vue implementation to use React

import React from 'react';

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import type { EmptyObject } from 'type-fest';

import { PopoverIcon, cn } from '../..';
import { FormFieldContainer } from './FormFieldContainer';

// Also added touch support for moving the slider on mobile browsers
const sliderMinX = 0;
let sliderMaxX = 280;

const greenGradient = { end: '#9dac00', start: '#068c3b' };
const yellowGradient = { end: '#a17208', start: '#9dac00' };
const orangeGradient = { end: '#FF9008', start: '#a17208' };
const redGradient = { end: '#7C0000', start: '#FF9008' };

type State = {
  description: string;
  dragging: boolean;
  gradientEnd: string;
  gradientStart: string;
  height: number;
  isFocused: boolean;
  sliderX: number;
  width: number;
};

export class Example extends React.Component<EmptyObject, State> {
  handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!this.state.isFocused) {
      return;
    }
    if (e.key === 'ArrowRight') {
      let movedRight = this.state.sliderX + 10;
      if (movedRight > sliderMaxX) {
        this.setState({ sliderX: sliderMaxX });
      } else {
        this.setState({ sliderX: movedRight });
      }
    } else if (e.key === 'ArrowLeft') {
      let movedLeft = this.state.sliderX - 10;
      if (movedLeft < sliderMinX) {
        this.setState({ sliderX: sliderMinX });
      } else {
        this.setState({ sliderX: movedLeft });
      }
    }
  };
  private activeGradientStart?: string;
  private gradations: number[];
  private initialMouseX?: number;

  private initialSliderX?: number;

  constructor(props: EmptyObject) {
    super(props);

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.startTouchDrag = this.startTouchDrag.bind(this);
    this.mouseMoving = this.mouseMoving.bind(this);
    this.touchMoving = this.touchMoving.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
    // this.bgStyle = this.bgStyle.bind(this);

    this.gradations = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    this.state = {
      description: 'this is a numeric slider',
      dragging: false,
      gradientEnd: greenGradient.end,
      gradientStart: greenGradient.start,
      height: window.innerHeight,
      isFocused: false,
      sliderX: 0,
      width: window.innerWidth
    };
  }

  get currentValue() {
    const valueRangeStart = 0;
    const valueRange = 10;
    return (this.state.sliderX / sliderMaxX) * valueRange + valueRangeStart;
  }

  get gradientEnd() {
    return this.state.gradientEnd;
  }

  set gradientEnd(value) {
    this.setState({ gradientEnd: value });
  }

  get gradientStart() {
    return this.state.gradientStart;
  }

  set gradientStart(value) {
    this.setState({ gradientStart: value });
  }

  // bgStyle() {
  //   return { background: 'linear-gradient(to bottom right,' + `${this.gradientStart}, ${this.gradientEnd})` };
  // }

  commonMoving(pageX: number) {
    if (this.state.dragging) {
      const dragAmount = pageX - this.initialMouseX!;
      const targetX = this.initialSliderX! + dragAmount;

      // keep slider inside limits
      const sliderX = Math.max(Math.min(targetX, sliderMaxX), sliderMinX);
      this.setState({ sliderX: sliderX });

      let targetGradient = greenGradient;
      if (this.currentValue >= 3) {
        targetGradient = yellowGradient;
      }
      if (this.currentValue >= 5) {
        targetGradient = orangeGradient;
      }
      if (this.currentValue >= 8) {
        targetGradient = redGradient;
      }

      if (this.activeGradientStart !== targetGradient.start) {
        this.activeGradientStart = targetGradient.start;
      }
    }
  }

  commonStartDrag(pageX: number) {
    this.initialMouseX = pageX;
    this.setState({ dragging: true });
    this.initialSliderX = this.state.sliderX;
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  gradationElementStyle(value: number) {
    const nearDistance = 0.5;
    const liftDistance = 12;

    const diff = Math.abs(this.currentValue - value);
    const distY = diff / nearDistance - 1;

    // constrain the distance so that the element doesn't go to the bottom
    const elementY = Math.min(distY * liftDistance, 0);
    const lift = { top: `${elementY}px` };

    return lift;
  }

  mouseMoving(e: React.MouseEvent) {
    const pageX = e.pageX;
    this.commonMoving(pageX);
  }

  render() {
    return (
      <FormFieldContainer>
        <div className="grid grid-cols-[1fr] grid-rows-[3fr_1fr] overflow-x-hidden" id="app">
          <div className="relative bg-slate-200 dark:border-slate-600 dark:bg-slate-700 border border-slate-300">
            <div className="left-[calc(50%_-_300px)] absolute select-none bottom-[25px]">
              {this.gradations.map((value, i) => (
                <div
                  className="relative text-center inline-block w-10 opacity-70 mx-1.5 my-0"
                  key={i}
                  style={this.gradationElementStyle(value)}
                >
                  <span className="relative text-center inline-block w-10 opacity-70 mx-1.5 my-0-number">{value}</span>
                  <br />
                  <span className="relative text-center inline-block w-10 opacity-70 mx-1.5 my-0-line">|</span>
                </div>
              ))}
              <div className="relative text-center inline-block w-10 opacity-70 mx-1.5 my-0-number left-4 text-[4vh]">
                {Math.round(this.currentValue)}
              </div>
              <div className="relative text-center inline-block my-0-number left-8">
                <PopoverIcon icon={QuestionMarkCircleIcon} position="left" text={this.state.description} />
              </div>
            </div>
          </div>

          <div className="bg-[#ccc] h-3/4">
            <div
              className={
                'w-[600px] h-20 mt-[-30px] ml-[calc(50%_-_340px)] relative touch-none select-none ' +
                (this.state.dragging ? 'cursor-grabbing ' : '')
              }
              style={{ left: this.state.sliderX }}
              onMouseMove={this.mouseMoving}
              onMouseUp={this.stopDrag}
              onTouchEnd={this.stopDrag}
              onTouchMove={this.touchMoving}
            >
              <svg fill="none" height="30" viewBox="0 0 150 30" width="150" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M74.3132 0C47.0043 2.44032e-05 50.175 30 
                7.9179 30H144.27C99.4571 30 101.622 -2.44032e-05 74.3132 0Z"
                  fill="#ccc"
                  transform="translate(-7.38794 0.5)"
                />
              </svg>

              <div
                className={cn(
                  'absolute focus:border-2 w-[50px] h-[50px] bg-slate-500 dark:bg-slate-400 cursor-grab touch-none select-none rounded-[50%] left-[42px] top-[5px]',
                  this.state.dragging && 'cursor-grabbing'
                )}
                tabIndex={0}
                onFocus={() => this.setState({ isFocused: true })}
                onKeyDown={this.handleKeyDown}
                onMouseDown={this.startDrag}
                onTouchStart={this.startTouchDrag}
              >
                <i className="text-[white] ml-[21px] mt-4"></i>
              </div>
            </div>
          </div>
        </div>
      </FormFieldContainer>
    );
  }

  startDrag(e: React.MouseEvent) {
    const pageX = e.pageX;
    this.commonStartDrag(pageX);
  }

  startTouchDrag(e: React.TouchEvent) {
    e.preventDefault();
    const pageX = e.changedTouches[0]!.pageX;
    this.commonStartDrag(pageX);
  }

  stopDrag() {
    this.setState({ dragging: false });
  }
  touchMoving(e: React.TouchEvent) {
    e.preventDefault();
    const pageX = e.changedTouches[0]!.pageX;
    this.commonMoving(pageX);
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight, width: window.innerWidth });
    if (window.innerWidth > 500) {
      sliderMaxX = 520;
    }
  }
}
