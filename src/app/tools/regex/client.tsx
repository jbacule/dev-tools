"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Copy, Search, AlertCircle, CheckCircle, Info, Lightbulb } from "lucide-react";

interface RegexMatch {
  match: string;
  index: number;
  groups: (string | undefined)[];
  namedGroups: Record<string, string>;
}

const commonPatterns = [
  {
    name: "Email",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    description: "Validates email addresses",
    testString: "user@example.com\ninvalid-email\ntest.email+123@domain.co.uk"
  },
  {
    name: "Phone Number (US)",
    pattern: "^\\+?1?[-. ]?\\(?\\d{3}\\)?[-. ]?\\d{3}[-. ]?\\d{4}$",
    description: "Matches US phone numbers",
    testString: "(555) 123-4567\n555-123-4567\n+1 555.123.4567\n123-45-6789"
  },
  {
    name: "URL",
    pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
    description: "Matches HTTP/HTTPS URLs",
    testString: "https://www.example.com\nhttp://domain.org/path?query=value\nftp://invalid.com\nhttps://sub.domain.co.uk/page#section"
  },
  {
    name: "IPv4 Address",
    pattern: "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
    description: "Validates IPv4 addresses",
    testString: "192.168.1.1\n10.0.0.1\n256.1.1.1\n192.168.1.300"
  },
  {
    name: "Date (YYYY-MM-DD)",
    pattern: "^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$",
    description: "Matches dates in YYYY-MM-DD format",
    testString: "2024-01-15\n2024-12-31\n2024-13-01\n24-01-15"
  },
  {
    name: "Password (Strong)",
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    description: "Strong password: 8+ chars, uppercase, lowercase, number, special char",
    testString: "Password123!\npassword\nPASSWORD123\nPass123"
  }
];

export default function RegexClient() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    unicode: false,
    sticky: false
  });

  const regexResult = useMemo(() => {
    if (!pattern || !testString) {
      return null;
    }

    try {
      const flagsString = Object.entries(flags)
        .filter(([, enabled]) => enabled)
        .map(([flag]) => {
          switch (flag) {
            case 'global': return 'g';
            case 'ignoreCase': return 'i';
            case 'multiline': return 'm';
            case 'dotAll': return 's';
            case 'unicode': return 'u';
            case 'sticky': return 'y';
            default: return '';
          }
        })
        .join('');

      const regex = new RegExp(pattern, flagsString);
      const matches: RegexMatch[] = [];
      
      if (flags.global) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            namedGroups: match.groups || {}
          });
          
          // Prevent infinite loop for zero-length matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            namedGroups: match.groups || {}
          });
        }
      }

      return {
        isValid: true,
        matches,
        flags: flagsString
      };
    } catch (error) {
      return {
        isValid: false,
        matches: [],
        error: error instanceof Error ? error.message : "Invalid regular expression",
        flags: ""
      };
    }
  }, [pattern, testString, flags]);

  const loadCommonPattern = (commonPattern: typeof commonPatterns[0]) => {
    setPattern(commonPattern.pattern);
    setTestString(commonPattern.testString);
    toast.success(`Loaded ${commonPattern.name} pattern`);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const clearAll = () => {
    setPattern("");
    setTestString("");
    toast.success("Cleared all data");
  };

  const highlightMatches = (text: string, matches: RegexMatch[]) => {
    if (!matches.length) return text;

    let result = "";
    let lastIndex = 0;

    matches.forEach((match, index) => {
      // Add text before the match
      result += text.slice(lastIndex, match.index);
      
      // Add highlighted match
      result += `<span class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded font-medium" data-match="${index}">${match.match}</span>`;
      
      lastIndex = match.index + match.match.length;
    });

    // Add remaining text
    result += text.slice(lastIndex);
    
    return result;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Search className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Regular Expression Tester</h1>
          <p className="text-muted-foreground">Test and debug regex patterns with live matching and group visualization</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pattern Input */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Regex Pattern & Test Data</CardTitle>
              <CardDescription>
                Enter your regular expression pattern and test string
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pattern Input */}
              <div className="space-y-2">
                <Label htmlFor="pattern">Regular Expression Pattern</Label>
                <div className="flex gap-2">
                  <span className="flex items-center text-muted-foreground font-mono">/</span>
                  <Input
                    id="pattern"
                    placeholder="Enter your regex pattern..."
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="font-mono"
                  />
                  <span className="flex items-center text-muted-foreground font-mono">/</span>
                </div>
              </div>

              {/* Flags */}
              <div className="space-y-3">
                <Label>Flags</Label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="global"
                      checked={flags.global}
                      onCheckedChange={(checked) => setFlags(prev => ({ ...prev, global: checked as boolean }))}
                    />
                    <Label htmlFor="global" className="text-sm font-mono">g (global)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ignoreCase"
                      checked={flags.ignoreCase}
                      onCheckedChange={(checked) => setFlags(prev => ({ ...prev, ignoreCase: checked as boolean }))}
                    />
                    <Label htmlFor="ignoreCase" className="text-sm font-mono">i (ignore case)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="multiline"
                      checked={flags.multiline}
                      onCheckedChange={(checked) => setFlags(prev => ({ ...prev, multiline: checked as boolean }))}
                    />
                    <Label htmlFor="multiline" className="text-sm font-mono">m (multiline)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dotAll"
                      checked={flags.dotAll}
                      onCheckedChange={(checked) => setFlags(prev => ({ ...prev, dotAll: checked as boolean }))}
                    />
                    <Label htmlFor="dotAll" className="text-sm font-mono">s (dot all)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="unicode"
                      checked={flags.unicode}
                      onCheckedChange={(checked) => setFlags(prev => ({ ...prev, unicode: checked as boolean }))}
                    />
                    <Label htmlFor="unicode" className="text-sm font-mono">u (unicode)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sticky"
                      checked={flags.sticky}
                      onCheckedChange={(checked) => setFlags(prev => ({ ...prev, sticky: checked as boolean }))}
                    />
                    <Label htmlFor="sticky" className="text-sm font-mono">y (sticky)</Label>
                  </div>
                </div>
              </div>

              {/* Test String */}
              <div className="space-y-2">
                <Label htmlFor="test-string">Test String</Label>
                <Textarea
                  id="test-string"
                  placeholder="Enter text to test against your regex pattern..."
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  className="font-mono min-h-[200px] text-sm"
                />
              </div>

              <Button variant="outline" onClick={clearAll}>
                Clear All
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Common Patterns */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Common Patterns
              </CardTitle>
              <CardDescription>
                Load popular regex patterns to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {commonPatterns.map((pattern, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => loadCommonPattern(pattern)}
                  >
                    <div>
                      <div className="font-medium text-sm">{pattern.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {pattern.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results */}
      {regexResult && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {regexResult.isValid ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                {regexResult.isValid ? "Regex Results" : "Regex Error"}
              </CardTitle>
              {regexResult.isValid && pattern && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(pattern, "Pattern")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {regexResult.isValid ? (
              <div className="space-y-4">
                {/* Match Summary */}
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Matches found:</span>
                    <span className="font-medium">{regexResult.matches.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Flags:</span>
                    <span className="font-mono">{regexResult.flags || "none"}</span>
                  </div>
                </div>

                {/* Highlighted Text */}
                {testString && (
                  <div className="space-y-2">
                    <Label>Highlighted Matches</Label>
                    <div 
                      className="p-3 bg-muted rounded-lg font-mono text-sm whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightMatches(testString, regexResult.matches) 
                      }}
                    />
                  </div>
                )}

                {/* Match Details */}
                {regexResult.matches.length > 0 && (
                  <div className="space-y-3">
                    <Label>Match Details</Label>
                    <div className="space-y-2">
                      {regexResult.matches.map((match, index) => (
                        <div key={index} className="p-3 bg-muted rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">Match {index + 1}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(match.match, `Match ${index + 1}`)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div>
                              <span className="text-muted-foreground">Text:</span>
                              <span className="font-mono ml-2">{match.match}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Position:</span>
                              <span className="font-mono ml-2">{match.index}-{match.index + match.match.length}</span>
                            </div>
                            {match.groups.length > 0 && (
                              <div>
                                <span className="text-muted-foreground">Groups:</span>
                                <div className="ml-2 space-y-1">
                                  {match.groups.map((group, groupIndex) => (
                                    <div key={groupIndex} className="font-mono text-xs">
                                      Group {groupIndex + 1}: {group || "(not captured)"}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {Object.keys(match.namedGroups).length > 0 && (
                              <div>
                                <span className="text-muted-foreground">Named Groups:</span>
                                <div className="ml-2 space-y-1">
                                  {Object.entries(match.namedGroups).map(([name, value]) => (
                                    <div key={name} className="font-mono text-xs">
                                      {name}: {value}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {regexResult.matches.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No matches found
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-800 font-medium">Invalid Regular Expression</span>
                </div>
                <div className="p-3 bg-gray-50 border rounded-lg">
                  <Label className="text-sm font-medium">Error Details:</Label>
                  <p className="text-sm text-red-600 font-mono mt-1">{regexResult.error}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Regex Quick Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Common Patterns</h4>
                <div className="space-y-1 font-mono text-xs">
                  <div><code>.</code> - Any character</div>
                  <div><code>*</code> - 0 or more</div>
                  <div><code>+</code> - 1 or more</div>
                  <div><code>?</code> - 0 or 1</div>
                  <div><code>^</code> - Start of string</div>
                  <div><code>$</code> - End of string</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Character Classes</h4>
                <div className="space-y-1 font-mono text-xs">
                  <div><code>\d</code> - Digit [0-9]</div>
                  <div><code>\w</code> - Word [A-Za-z0-9_]</div>
                  <div><code>\s</code> - Whitespace</div>
                  <div><code>[abc]</code> - Any of a, b, c</div>
                  <div><code>[a-z]</code> - Range a to z</div>
                  <div><code>[^abc]</code> - Not a, b, or c</div>
                </div>
              </div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Tip:</strong> Use parentheses <code>()</code> to create capture groups, 
                and <code>(?:)</code> for non-capturing groups. Named groups can be created with <code>(?&lt;name&gt;pattern)</code>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}