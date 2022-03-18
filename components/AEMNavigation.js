import React, { Component } from 'react';
import Link from 'next/link';
import { withMappable } from '@adobe/aem-react-editable-components';
import { NavigationConsumer } from '../lib/navigation';
import { GlobalConsumer } from '../lib/globalContext';

const { NEXT_PUBLIC_AEM_SITE } = process.env;
export const resourceType = `${NEXT_PUBLIC_AEM_SITE}/components/navigation`;

export const NavigationConfig = {
    resourceType,
    emptyLabel: 'Navigation',
    isEmpty: function(props) {
        return !props || !props.items || props.items.length === 0;
    }
};

export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.hasCatalog = false;
        this.getContentItems = this.getContentItems.bind(this);
    }

    getContentItems(rootPath) {
        const { items } = this.props;
        return items[0]?.children.map(c => {
            if (c.title.toLowerCase() === 'catalog') {
                this.hasCatalog = true;
            }
            return {
                path: c.path.replace(rootPath, ''),
                id: c.id,
                title: c.title
            }
        });
    }

    render() {
        if (NavigationConfig.isEmpty(this.props)) {
            return null;
        }

        const { appliedCssClassNames } = this.props;

        return (
            <div className='cmp-navigation'>
                <GlobalConsumer>
                    {(globalContext) => (
                        <ul className='cmp-navigation__group'>
                            {this.getContentItems(globalContext.rootPath).map(ci =>
                                <li className='cmp-navigation__item cmp-navigation__item--level-1' key={ci.id}>
                                    <Link href={`${ci.path}`}>
                                        <a className='cmp-navigation__item-link'>{ci.title}</a>
                                    </Link>
                                    {(ci.title.toLowerCase() === 'catalog' && appliedCssClassNames !== 'cmp-navigation--footer') &&
                                        <ul className='cmp-navigation__group'>
                                            <NavigationConsumer>
                                                {(categories) => categories.map(c =>
                                                    <li className='cmp-navigation__item cmp-navigation__item--level-2' key={c.uid}>
                                                        <Link href={`/catalog/${c.url_path}`}>
                                                            <a className='cmp-navigation__item-link'>{c.name}</a>
                                                        </Link>
                                                    </li>
                                                )}
                                            </NavigationConsumer>
                                        </ul>
                                    }
                                </li>
                            )}
                            {(!this.hasCatalog && appliedCssClassNames !== 'cmp-navigation--footer') &&
                                <li className='cmp-navigation__item cmp-navigation__item--level-1'>
                                    <Link href='/catalog'>
                                        <a className='cmp-navigation__item-link'>Catalog</a>
                                    </Link>
                                    {appliedCssClassNames !== 'cmp-navigation--footer' &&
                                        <ul className='cmp-navigation__group'>
                                            <NavigationConsumer>
                                                {(categories) => categories.map(c =>
                                                    <li className='cmp-navigation__item cmp-navigation__item--level-2' key={c.uid}>
                                                        <Link href={`/catalog/${c.url_path}`}>
                                                            <a className='cmp-navigation__item-link'>{c.name}</a>
                                                        </Link>
                                                    </li>
                                                )}
                                            </NavigationConsumer>
                                        </ul>
                                    }
                                </li>}
                        </ul>
                    )}
                </GlobalConsumer>
            </div>
        );
    }
}

export const AEMNavigation = withMappable(Navigation, NavigationConfig);

export default AEMNavigation;
