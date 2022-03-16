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
    getContentItems(rootPath) {
        const { items } = this.props;
        console.log('items', items);
        return items[0]?.children.map(c => ({
            path: c.path.replace(rootPath, ''),
            id: c.id,
            title: c.title
        }));
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
                            {this.getContentItems(globalContext.rootPath).map(c =>
                                <li className='cmp-navigation__item cmp-navigation__item--level-1' key={c.id}>
                                    <Link href={`${c.path}`}>
                                        <a className='cmp-navigation__item-link'>{c.title}</a>
                                    </Link>
                                </li>
                            )}
                            <li className='cmp-navigation__item cmp-navigation__item--level-1'>
                                <Link href='/catalog'>
                                    <a className='cmp-navigation__item-link'>Catalog</a>
                                </Link>
                                {appliedCssClassNames !== 'cmp-navigation--footer' &&
                                    <ul className='cmp-navigation__group'>
                                        <NavigationConsumer>
                                            {(categories) => categories.map(c =>
                                                <li className='cmp-navigation__item cmp-navigation__item--level-2' key={c.uid}>
                                                    <Link href={`/catalog/category/${c.url_path}`}>
                                                        <a className='cmp-navigation__item-link'>{c.name}</a>
                                                    </Link>
                                                </li>
                                            )}
                                        </NavigationConsumer>
                                    </ul>
                                }
                            </li>

                        </ul>
                    )}
                </GlobalConsumer>
            </div>
        );
    }
}

export const AEMNavigation = withMappable(Navigation, NavigationConfig);

export default AEMNavigation;
