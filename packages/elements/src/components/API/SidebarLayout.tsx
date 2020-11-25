import { TableOfContents } from '@stoplight/ui-kit';
import * as React from 'react';

import { useTocContents } from '../../hooks/useTocContents';
import { ITableOfContentsTree } from '../../types';
import { getNodeType, isOperation, IUriMap } from '../../utils/oas';
import { Docs } from '../Docs';
import { Row } from '../TableOfContents/Row';
import { TryIt } from '../TryIt';
import { TryItHeader } from '../TryIt/header';

type SidebarLayoutProps = {
  pathname: string;
  uriMap: IUriMap;
  tree: ITableOfContentsTree;
};

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ pathname, tree, uriMap }) => {
  const contents = useTocContents(tree, true).map(item => ({
    ...item,
    isActive: item.to === pathname,
    isSelected: item.to === pathname,
  }));

  const nodeType = getNodeType(pathname);
  const nodeData = uriMap[pathname] || uriMap['/'];
  const showTryIt = isOperation(pathname);

  return (
    <>
      <TableOfContents contents={contents} rowComponent={Row} rowComponentExtraProps={{ pathname }} />
      <div className="flex-grow p-5 ContentViewer">
        <div className="flex">
          <Docs className="px-10" nodeData={nodeData} nodeType={nodeType} />
          {showTryIt && (
            <div className="w-2/5 border-l relative">
              <div className="inset-0 overflow-auto px-10">
                <TryItHeader />
                <TryIt nodeType={nodeType} nodeData={nodeData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
