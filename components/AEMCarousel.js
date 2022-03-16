import React from 'react';
import { withMappable, Container } from '@adobe/aem-react-editable-components';

export const resourceType = 'wknd/components/carousel';

export const CarouselEditConfig = {
    resourceType,
    emptyLabel: 'Carousel',
}

export class Carousel extends Container {

    get controls() {
        const { autoplay } = this.props;

        return (
            <div className='cmp-carousel__actions'>
                <button className='cmp-carousel__action cmp-carousel__action--previous' type='button'>
                    <span className='cmp-carousel__action-icon'></span>
                    <span className='cmp-carousel__action-text'>Previous</span>
                </button>
                <button className='cmp-carousel__action cmp-carousel__action--next' type='button'>
                    <span className='cmp-carousel__action-icon'></span>
                    <span className='cmp-carousel__action-text'>Next</span>
                </button>
                {autoplay && (
                    <>
                        <button className='cmp-carousel__action cmp-carousel__action--pause' type='button'>
                            <span className='cmp-carousel__action-icon'></span>
                            <span className='cmp-carousel__action-text'>Pause</span>
                        </button>
                        <button className='cmp-carousel__action cmp-carousel__action--play cmp-carousel__action--disabled' type='button'>
                            <span className='cmp-carousel__action-icon'></span>
                            <span className='cmp-carousel__action-text'>Play</span>
                        </button>
                    </>
                )}
            </div >
        );
    }

    render() {
        const { id, controlsPrepended } = this.props;

        return (
            <div id={id} className='cmp-carousel'>
                {controlsPrepended && this.controls}
                <div className='cmp-carousel__content'>
                    {this.childComponents.map((childComponent, index) => (
                        <div className={`cmp-carousel__item${index === 0 ? ' cmp-carousel__item--active' : ''}`}>
                            {childComponent}
                        </div>
                    ))}
                    {!controlsPrepended && this.controls}
                    <ol className='cmp-carousel__indicators'>
                        {this.childComponents.map((childComponent, index) => (
                            <li className={`cmp-carousel__indicator${index === 0 ? ' cmp-carousel__indicator--active' : ''}`}>
                                {childComponent.props.title}
                            </li>
                        ))}
                    </ol>
                </div>
            </div >
        )
    }
}


export const AEMCarousel = withMappable(Carousel, CarouselEditConfig);

export default AEMCarousel;