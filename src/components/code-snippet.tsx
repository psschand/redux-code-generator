import * as React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Button, ButtonGroup } from './button';
const { default: Highlight, defaultProps } = require('prism-react-renderer');

type CodeSnippetProps = {
  code: string;
  language?: string;
};
export const CodeSnippet: React.FunctionComponent<CodeSnippetProps> = ({
  code,
  language = 'javascript'
}) => (
  <Highlight {...defaultProps} code={code} language={language}>
    {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
      <pre className={className} style={style}>
        {tokens.map((line: any, i: number) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token: any, key: number) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

export class CodeSnippetCollapsible extends React.Component<
  CodeSnippetProps,
  { showAll: boolean }
> {
  state = {
    showAll: false
  };

  handleToggle = () =>
    this.setState(prevState => ({ showAll: !prevState.showAll }));

  render() {
    const props = this.props;
    return (
      <>
        <div
          style={
            this.state.showAll
              ? undefined
              : { maxHeight: 200, overflow: 'scroll' }
          }
        >
          <CodeSnippet {...props} />
        </div>
        <ButtonGroup>
          <Button onClick={this.handleToggle}>
            {this.state.showAll ? 'Show Less' : 'Show More'}
          </Button>
          <CopyToClipboard text={props.code}>
            <Button variant="success">Copy</Button>
          </CopyToClipboard>
        </ButtonGroup>
      </>
    );
  }
}
