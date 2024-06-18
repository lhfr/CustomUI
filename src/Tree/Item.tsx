export default ({ current, onlyLeafJump, disabledJumpIds, onRightClick }) => {
  // 叶节点
  const isLeaf = !current.children || current.children?.length === 0
  // 仅叶节点可跳转
  const _onlyLeafJump = !onlyLeafJump || (isLeaf && onlyLeafJump)
  // 禁止跳转的节点 id 集合
  const _disabledJumpIds = !disabledJumpIds?.includes(current.id)

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isLeaf && (
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#949ca4',
              marginLeft: 3,
              marginRight: 6
            }}
          />
        )}
        {current.name}
      </div>

      <div className="flex" style={{ alignItems: 'center' }} onClick={(e) => {
        e.stopPropagation()
        typeof onRightClick === 'function' && onRightClick(current)
      }}>
        {current.value}
        {/* 占位 */}
        <div className="flex" style={{ width: 10, height: 10, alignItems: 'center' }}>
          {_onlyLeafJump &&  _disabledJumpIds && (
            <span style={{
              width: 6,
              height: 6,
              border: '1px solid #949ca4',
              borderWidth: '1px 1px 0 0',
              transform: 'rotate(45deg)',
              marginLeft: 5
            }} />
          )}
        </div>
      </div>
    </div>
  )
}

